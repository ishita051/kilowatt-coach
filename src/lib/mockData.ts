export interface EnergyData {
  timestamp: Date;
  usage: number; // kW
  cost: number; // USD
  appliances: {
    hvac: number;
    waterHeater: number;
    lighting: number;
    electronics: number;
    other: number;
  };
}

export const generateMockEnergyData = (hours: number = 48): EnergyData[] => {
  const data: EnergyData[] = [];
  const now = new Date();
  
  for (let i = hours; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - (i * 15 * 60 * 1000)); // 15-minute intervals
    const hour = timestamp.getHours();
    
    // Base usage patterns throughout the day
    let baseUsage = 1.5; // Baseline home usage
    
    // Morning peak (6-9 AM)
    if (hour >= 6 && hour <= 9) {
      baseUsage += 1.5 + Math.random() * 0.8;
    }
    // Evening peak (4-9 PM)
    else if (hour >= 16 && hour <= 21) {
      baseUsage += 2.0 + Math.random() * 1.2;
    }
    // Night low usage (10 PM - 5 AM)
    else if (hour >= 22 || hour <= 5) {
      baseUsage += 0.2 + Math.random() * 0.3;
    }
    // Daytime moderate (10 AM - 3 PM)
    else {
      baseUsage += 0.8 + Math.random() * 0.6;
    }
    
    // Add some weather simulation (hot day = more AC)
    const isHotDay = Math.random() > 0.7;
    if (isHotDay && (hour >= 12 && hour <= 18)) {
      baseUsage += 1.0 + Math.random() * 0.5;
    }
    
    // Weekend patterns (slightly different usage)
    const isWeekend = timestamp.getDay() === 0 || timestamp.getDay() === 6;
    if (isWeekend) {
      baseUsage *= 1.1; // Slightly higher usage on weekends
    }
    
    // Random variations
    baseUsage += (Math.random() - 0.5) * 0.4;
    baseUsage = Math.max(0.5, baseUsage); // Minimum usage
    
    // Calculate appliance breakdown
    const hvacPercentage = 0.45 + (Math.random() - 0.5) * 0.1;
    const waterHeaterPercentage = 0.18 + (Math.random() - 0.5) * 0.05;
    const lightingPercentage = 0.12 + (Math.random() - 0.5) * 0.03;
    const electronicsPercentage = 0.15 + (Math.random() - 0.5) * 0.04;
    const otherPercentage = 1 - hvacPercentage - waterHeaterPercentage - lightingPercentage - electronicsPercentage;
    
    const appliances = {
      hvac: baseUsage * hvacPercentage,
      waterHeater: baseUsage * waterHeaterPercentage,
      lighting: baseUsage * lightingPercentage,
      electronics: baseUsage * electronicsPercentage,
      other: baseUsage * otherPercentage
    };
    
    // Time-of-use pricing
    let rate = 0.12; // Base rate
    if (hour >= 16 && hour <= 21) {
      rate = 0.18; // Peak rate
    } else if (hour >= 22 || hour <= 6) {
      rate = 0.08; // Off-peak rate
    }
    
    data.push({
      timestamp,
      usage: Math.round(baseUsage * 100) / 100,
      cost: Math.round(baseUsage * rate * 100) / 100,
      appliances
    });
  }
  
  return data;
};

export const getMockBillHistory = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  return months.map((month, index) => ({
    month,
    amount: 120 + (Math.random() - 0.5) * 40 + (index * 5), // Seasonal variation
    usage: 800 + (Math.random() - 0.5) * 200 + (index * 30),
    efficiency: 70 + Math.random() * 25
  }));
};

export const getMockWeatherImpact = () => {
  return {
    temperature: 78 + Math.random() * 20,
    humidity: 45 + Math.random() * 30,
    forecast: Math.random() > 0.5 ? 'Hot day expected - AC usage may increase' : 'Mild weather - good day for energy savings',
    impact: Math.random() > 0.6 ? 'high' : Math.random() > 0.3 ? 'medium' : 'low'
  };
};