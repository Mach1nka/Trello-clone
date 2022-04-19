export enum AlertStatusData {
  Success = 'success',
  Info = 'info',
  Warning = 'warning',
  Error = 'error'
}

export interface Alert {
  id: string;
  status: AlertStatusData;
  title?: string;
  message: string;
}

export interface MaintainState {
  loading: boolean;
  alerts: Alert[];
}
