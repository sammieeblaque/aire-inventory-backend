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
    stripInitialArgs: boolean = true,
  ): Promise<T | any> {
    return this.entityManager.transaction(
      async (transactionalEntityManager) => {
        this.logger.debug(`Running ${useCases.length} use cases`);
        this.logger.debug(`Initial args: ${JSON.stringify(initialArgs)}`);

        let results: Record<string, any> = initialArgs
          ? { ...initialArgs }
          : {};

        for (const useCase of useCases) {
          this.logger.debug(`Running use case: ${useCase.constructor.name}`);
          this.logger.debug(`Use case args: ${JSON.stringify(results)}`);

          const result = await useCase.execute(
            transactionalEntityManager,
            results,
          );

          results = {
            ...results,
            result,
          };
        }

        if (stripInitialArgs) {
          for (const key in initialArgs) {
            delete results[key];
          }
        }

        this.logger.debug(`Final results: ${JSON.stringify(results)}`);
        return results;
      },
    );
  }
}
