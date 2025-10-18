export interface BaseDto {
    uuid: string;
    created_at: string; // LocalDateTime se convierte a string en JSON
    updated_at: string; // LocalDateTime se convierte a string en JSON
  }