export interface city {
  name: string;
  population: number;
}

export interface AviaData {
  fromTown: string;
  toTown: string;
  fromDate: Date | null;
  backDate: Date | null;
}
