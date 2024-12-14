import { Injectable } from '@nestjs/common';
import { Product } from '../inventory/entities/product.entity';
import { parse } from 'papaparse';

@Injectable()
export class UploadsService {
  async uploadProductFile(filePath: string | Buffer): Promise<Product[]> {
    const csvData = filePath.toString();

    return new Promise((resolve, reject) => {
      parse(csvData, {
        header: true, // Treat the first row as headers
        skipEmptyLines: true, // Ignore empty lines
        complete: (results) => {
          resolve(results.data); // Resolve with parsed data
        },
        error: (error) => {
          reject(error); // Reject if parsing fails
        },
      });
    });
  }
}
