import { OrderProcessorService } from '../services/order-processor/order-processor.service';
import { FileReaderImpl } from '../infra/file-reader';
import { FileParserService } from '../services/file-parser/file-parser.service';

export const makeOrderProcessorService = (): OrderProcessorService => {
  const fileReader = new FileReaderImpl();
  const fileParser = new FileParserService();
  return new OrderProcessorService(fileReader, fileParser);
};
