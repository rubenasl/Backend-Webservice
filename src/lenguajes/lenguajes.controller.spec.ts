import { Test, TestingModule } from '@nestjs/testing';
import { LenguajesController } from './lenguajes.controller';
import { LenguajesService } from './lenguajes.service';

describe('LenguajesController', () => {
  let controller: LenguajesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LenguajesController],
      providers: [LenguajesService],
    }).compile();

    controller = module.get<LenguajesController>(LenguajesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
