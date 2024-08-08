import { Test, TestingModule } from '@nestjs/testing';
import { LenguajesService } from './lenguajes.service';

describe('LenguajesService', () => {
  let service: LenguajesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LenguajesService],
    }).compile();

    service = module.get<LenguajesService>(LenguajesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
