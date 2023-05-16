export interface PingCheck {
    _id: string;
    user: string;
    ipAddress: string;
    interval: number;
    status: boolean;
    lastCheck: Date;
    latencyHistory: LatencyHistory[];
  }
  
  export interface LatencyHistory {
    _id: string
    latency: number;
    checkedAt: Date;
  }
  
  export interface PingCheckIns {
    ipAddress: string;
    interval: number;
  }