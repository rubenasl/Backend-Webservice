import { Test, TestingModule } from '@nestjs/testing';
import { ProjectImgService } from './project-img.service';

describe('ProjectImgService', () => {
  let service: ProjectImgService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectImgService],
    }).compile();

    service = module.get<ProjectImgService>(ProjectImgService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
