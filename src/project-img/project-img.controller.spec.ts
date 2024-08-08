import { Test, TestingModule } from '@nestjs/testing';
import { ProjectImgController } from './project-img.controller';
import { ProjectImgService } from './project-img.service';

describe('ProjectImgController', () => {
  let controller: ProjectImgController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectImgController],
      providers: [ProjectImgService],
    }).compile();

    controller = module.get<ProjectImgController>(ProjectImgController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
