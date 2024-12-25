import { Test, TestingModule } from '@nestjs/testing';
import { MultipleSignatoryService } from './multiple-signatory.service';

describe('MultipleSignatoryService', () => {
  let service: MultipleSignatoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MultipleSignatoryService],
    }).compile();

    service = module.get<MultipleSignatoryService>(MultipleSignatoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
