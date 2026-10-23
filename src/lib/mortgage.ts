/** Mortgage math shared by the calculator's build-time defaults and its browser script. */
export interface MortgageInput {
  price: number;
  downPayment: number;
  ratePct: number;
  years: number;
  taxesYearly: number;
  insuranceYearly: number;
}

export interface MortgageResult {
  loan: number;
  principalInterest: number;
  taxes: number;
  insurance: number;
  total: number;
  totalInterest: number;
}

export function mortgage({ price, downPayment, ratePct, years, taxesYearly, insuranceYearly }: MortgageInput): MortgageResult {
  const loan = Math.max(0, price - Math.min(Math.max(0, downPayment), price));
  const n = Math.max(1, Math.round(years * 12));
  const r = Math.max(0, ratePct) / 100 / 12;
  const principalInterest = loan === 0 ? 0 : r === 0 ? loan / n : (loan * r) / (1 - Math.pow(1 + r, -n));
  const taxes = Math.max(0, taxesYearly) / 12;
  const insurance = Math.max(0, insuranceYearly) / 12;
  return {
    loan,
    principalInterest,
    taxes,
    insurance,
    total: principalInterest + taxes + insurance,
    totalInterest: Math.max(0, principalInterest * n - loan),
  };
}

export const usd = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
