import { Injectable, Logger } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { UseCase } from 'src/@types';
import { EntityManager } from 'typeorm';

@Injectable()
export class BrokerService {
  private readonly logger = new Logger(BrokerService.name);

  constructor(@InjectEntityManager() private entityManager: EntityManager) {}

  async runUseCases<T>(
    useCases: UseCase[],
    initialArgs: Record<string, any> = {},
  ): Promise<T | any> {
    return this.entityManager.transaction(
      async (transactionalEntityManager) => {
        this.logger.debug(`Running ${useCases.length} use cases`);

        const results: Record<string, any> = { ...initialArgs };

        for (const useCase of useCases) {
          this.logger.debug(`Executing use case: ${useCase.constructor.name}`);
          results.result = await useCase.execute(
            transactionalEntityManager,
            results,
          );
        }

        this.logger.debug(`Execution results: ${JSON.stringify(results)}`);
        return results;
      },
    );
  }
}
