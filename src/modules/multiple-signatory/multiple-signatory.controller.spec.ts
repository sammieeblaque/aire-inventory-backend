import { Test, TestingModule } from '@nestjs/testing';
import { MultipleSignatoryController } from './multiple-signatory.controller';
import { MultipleSignatoryService } from './multiple-signatory.service';

describe('MultipleSignatoryController', () => {
  let controller: MultipleSignatoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MultipleSignatoryController],
      providers: [MultipleSignatoryService],
    }).compile();

    controller = module.get<MultipleSignatoryController>(MultipleSignatoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
