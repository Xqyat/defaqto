// Мокаем axios перед импортом
jest.mock('axios', () => ({
    get: jest.fn()
  }));
  
  import axios from 'axios';
  import { API_BASE_URL } from '../../config';
  
  const mockedAxios = axios;
  
  test('47: GET-запрос к /api/afisha, проверка структуры ответа', async () => {
    const mockResponse = {
      data: {
        events: [
          { 
            _id: '1', 
            name: 'Событие 1', 
            entranceType: 'free',
            description: 'Описание',
            date: '2024-12-31',
            time: '20:00'
          }
        ]
      }
    };
    
    mockedAxios.get.mockResolvedValueOnce(mockResponse);
    
    const response = await axios.get(`${API_BASE_URL}/api/afisha`);
    
    expect(mockedAxios.get).toHaveBeenCalledWith(`${API_BASE_URL}/api/afisha`);
    expect(response.data).toHaveProperty('events');
    expect(Array.isArray(response.data.events)).toBe(true);
    expect(response.data.events[0]).toHaveProperty('_id');
    expect(response.data.events[0]).toHaveProperty('name');
  });