import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { MultiSignatureService } from './multiple-signatory.service';
import { UpdateMultipleSignatoryDto } from './dto/update-multiple-signatory.dto';

@Controller('multiple-signatory')
export class MultipleSignatoryController {
  constructor(
    private readonly multipleSignatoryService: MultiSignatureService,
  ) {}

  @Get()
  findAll() {
    return this.multipleSignatoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.multipleSignatoryService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMultipleSignatoryDto: UpdateMultipleSignatoryDto,
  ) {
    return this.multipleSignatoryService.update(id, updateMultipleSignatoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.multipleSignatoryService.remove(id);
  }
}
