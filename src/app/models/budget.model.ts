import { Category } from './category.model';

export interface Budget {
  id?: number;
  name: string;
  limitAmount: number;
  period: string;
  categoryId: number;
  categoryName: string;
}

/*
      "name": "Budget Informatique",
      "limitAmount": 1500.50,
      "period": "2026-06",
      "categoryId": 4
*/
/*


name: "dd"
limitAmount: 1200
period: "2026-07"
category:
  id: 3
  name: "Transport"
  description: "Carburant, transports en commun et entretien voiture"
  color: "#9467BD"
*/
