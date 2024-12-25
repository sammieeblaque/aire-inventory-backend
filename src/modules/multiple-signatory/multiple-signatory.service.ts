import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MultiSignature } from './entities/multiple-signatory.entity';
import { Repository } from 'typeorm';
import { WalletService } from '../wallet/wallet.service';
import { UpdateMultipleSignatoryDto } from './dto/update-multiple-signatory.dto';

@Injectable()
export class MultiSignatureService {
  constructor(
    @InjectRepository(MultiSignature)
    private multiSigRepository: Repository<MultiSignature>,
    private walletService: WalletService,
  ) {}

  async createRequest(
    userId: string,
    data: {
      amount: number;
      recipientId: string;
      approvers: string[];
      requiredApprovals: number;
    },
  ): Promise<MultiSignature> {
    const wallet = await this.walletService.getWallet(userId);

    if (data.requiredApprovals > data.approvers.length) {
      throw new BadRequestException(
        'Required approvals cannot exceed number of approvers',
      );
    }

    const request = this.multiSigRepository.create({
      wallet,
      ...data,
      approvals: [],
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours expiry
    });

    await this.multiSigRepository.save(request);
    // await this.walletService.placeHold(
    //   userId,
    //   data.amount,
    //   `Multi-sig request ${request.id}`,
    // );

    return request;
  }

  async approve(
    requestId: string,
    approverId: string,
  ): Promise<MultiSignature> {
    const request = await this.multiSigRepository.findOne({
      where: { id: requestId },
    });

    if (!request) {
      throw new NotFoundException('Multi-signature request not found');
    }

    if (!request.approvers.includes(approverId)) {
      throw new BadRequestException('Not authorized to approve this request');
    }

    if (request.approvals.includes(approverId)) {
      throw new BadRequestException('Already approved');
    }

    request.approvals.push(approverId);

    if (request.approvals.length >= request.requiredApprovals) {
      await this.executeTransaction(request);
      request.isExecuted = true;
    }

    return this.multiSigRepository.save(request);
  }

  private async executeTransaction(request: MultiSignature): Promise<void> {
    // await this.walletService.releaseHold(
    //   request.wallet.userId,
    //   request.amount,
    //   `Multi-sig request ${request.id} executed`,
    // );

    await this.walletService.transfer(
      request.wallet.userId,
      request.recipientId,
      { amount: request.amount },
    );
  }
  findAll() {
    return this.multiSigRepository.find();
  }
  findOne(id: string) {
    return this.multiSigRepository.findOne({
      where: { id },
    });
  }
  update(id: string, updateMultipleSignatoryDto: UpdateMultipleSignatoryDto) {
    return this.multiSigRepository.update(id, updateMultipleSignatoryDto);
  }

  async remove(id: string) {
    return this.multiSigRepository.softDelete(id);
  }
}
