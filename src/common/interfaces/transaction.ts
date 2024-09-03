export interface Transaction {
  transaction_id: string;
  user_id: string;
  asset_id: string;
  transaction_type: string;
  position_type: string;
  amount_token: number;
  amount_quote: number;
  status: 'pending' | 'successful' | 'failed';
  date: Date;
  dex_transaction_id: string;
  platform_balance_before: number;
  platform_balance_after: number;
}
