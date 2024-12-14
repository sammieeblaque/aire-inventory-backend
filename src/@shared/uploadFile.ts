import { Injectable } from '@nestjs/common';
import { parse, ParseConfig } from 'papaparse';

@Injectable()
export class UploadsService<T> {
  async uploadProductFile(
    filePath: string | Buffer,
    options: ParseConfig = {},
  ): Promise<T[]> {
    const csvData =
      typeof filePath === 'string' ? filePath : filePath.toString();

    return new Promise((resolve, reject) => {
      parse(csvData, {
        header: true, // Treat the first row as headers
        skipEmptyLines: true, // Ignore empty lines
        ...options,
        complete: (results) => resolve(results.data), // Resolve with parsed data
        error: (error) => reject(error), // Reject if parsing fails
      });
    });
  }
}
