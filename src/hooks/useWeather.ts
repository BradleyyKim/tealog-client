import { useQuery } from '@tanstack/react-query';

interface WeatherData {
  temp: number;
  description: string;
  icon: string;
  condition: string;
  suggestion: string;
}

const WEATHER_ICONS: Record<string, string> = {
  Clear: 'wb_sunny',
  Clouds: 'cloud',
  Rain: 'umbrella',
  Drizzle: 'grain',
  Thunderstorm: 'thunderstorm',
  Snow: 'ac_unit',
  Mist: 'blur_on',
  Fog: 'blur_on',
  Haze: 'blur_on',
};

// OpenWeatherMap condition id → 한국어 설명
const WEATHER_DESC_KO: Record<number, string> = {
  // Thunderstorm
  200: '가벼운 비를 동반한 뇌우',
  201: '비를 동반한 뇌우',
  202: '폭우를 동반한 뇌우',
  210: '약한 뇌우',
  211: '뇌우',
  212: '강한 뇌우',
  221: '불규칙한 뇌우',
  230: '약한 이슬비를 동반한 뇌우',
  231: '이슬비를 동반한 뇌우',
  232: '강한 이슬비를 동반한 뇌우',
  // Drizzle
  300: '가벼운 이슬비',
  301: '이슬비',
  302: '강한 이슬비',
  310: '가벼운 안개비',
  311: '안개비',
  312: '강한 안개비',
  313: '소나기와 이슬비',
  314: '강한 소나기와 이슬비',
  321: '소나기성 이슬비',
  // Rain
  500: '가벼운 비',
  501: '비',
  502: '강한 비',
  503: '매우 강한 비',
  504: '폭우',
  511: '어는 비',
  520: '가벼운 소나기',
  521: '소나기',
  522: '강한 소나기',
  531: '불규칙한 소나기',
  // Snow
  600: '가벼운 눈',
  601: '눈',
  602: '폭설',
  611: '진눈깨비',
  612: '가벼운 진눈깨비',
  613: '진눈깨비 소나기',
  615: '약한 비와 눈',
  616: '비와 눈',
  620: '가벼운 소낙눈',
  621: '소낙눈',
  622: '강한 소낙눈',
  // Atmosphere
  701: '옅은 안개',
  711: '연기',
  721: '연무',
  731: '모래바람',
  741: '안개',
  751: '모래',
  761: '먼지',
  762: '화산재',
  771: '돌풍',
  781: '토네이도',
  // Clear
  800: '맑음',
  // Clouds
  801: '구름 조금',
  802: '구름 약간',
  803: '구름 많음',
  804: '흐림',
};

function getTeaSuggestion(condition: string, temp: number): string {
  // 온도 구간: 추위(~5), 쌀쌀(~15), 선선(~22), 따뜻(~30), 더위(30~)
  if (condition === 'Snow') return '눈 내리는 날, 따뜻한 숙보이차로 온기를 채워보세요';
  if (condition === 'Thunderstorm') return '천둥 치는 날엔 진한 홍차 한 잔이 마음을 다독여줘요';
  if (condition === 'Rain') {
    if (temp <= 15) return '비 오는 쌀쌀한 날, 깊은 보이차가 잘 어울려요';
    return '빗소리 들으며 창가에서 우롱차 한 잔 어때요?';
  }
  if (condition === 'Drizzle') return '이슬비 내리는 날, 은은한 백차 한 잔이 어울려요';
  if (condition === 'Mist' || condition === 'Fog' || condition === 'Haze') {
    return '안개 낀 고즈넉한 날, 향기로운 차 한 잔이 어울려요';
  }
  if (condition === 'Clouds') {
    if (temp <= 10) return '흐리고 쌀쌀한 날, 묵직한 홍차로 몸을 녹여보세요';
    if (temp <= 22) return '구름 낀 날엔 부드러운 우롱차가 잘 어울려요';
    return '흐린 날의 여유, 가볍게 녹차 한 잔 어때요?';
  }
  // Clear
  if (temp <= 5) return '맑지만 추운 날, 진한 숙보이차로 온기를 채워보세요';
  if (temp <= 15) return '선선한 날씨에 따뜻한 홍차 한 잔 어때요?';
  if (temp <= 22) return '차 마시기 딱 좋은 날씨예요, 우롱차 한 잔 어때요?';
  if (temp <= 30) return '따뜻한 오늘, 가볍게 녹차 한 잔 어때요?';
  return '더운 날엔 시원한 냉차 한 잔이 최고예요';
}

function getPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation not supported'));
      return;
    }
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      timeout: 10000,
      maximumAge: 30 * 60 * 1000,
    });
  });
}

async function fetchWeather(): Promise<WeatherData | null> {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  if (!apiKey) return null;

  const position = await getPosition();
  const { latitude: lat, longitude: lon } = position.coords;

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=ko`,
  );

  if (!res.ok) throw new Error('Weather API error');

  const data = await res.json();
  const condition = data.weather[0].main as string;
  const conditionId = data.weather[0].id as number;
  const temp = Math.round(data.main.temp);
  const description = WEATHER_DESC_KO[conditionId] || data.weather[0].description;

  return {
    temp,
    description,
    icon: WEATHER_ICONS[condition] || 'wb_sunny',
    condition,
    suggestion: getTeaSuggestion(condition, temp),
  };
}

export function useWeather() {
  return useQuery<WeatherData | null>({
    queryKey: ['weather'],
    queryFn: fetchWeather,
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    retry: false,
  });
}
