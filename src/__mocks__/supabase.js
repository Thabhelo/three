// Mock Supabase client for testing
const createMockChain = () => {
  const chain = {
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    delete: jest.fn().mockReturnThis(),
    order: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    single: jest.fn().mockResolvedValue({ data: null, error: null }),
    then: jest.fn()
  };
  
  // Override methods to return proper mock data
  chain.insert.mockImplementation((data) => {
    const mockResult = {
      select: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({
        data: {
          id: '123',
          created_at: '2024-01-01T00:00:00Z',
          email: data[0]?.email || 'test@example.com',
          full_name: data[0]?.full_name || 'Test User'
        },
        error: null
      })
    };
    return mockResult;
  });
  
  return chain;
};

export const createClient = jest.fn(() => ({
  from: jest.fn(() => createMockChain()),
  auth: {
    signInWithPassword: jest.fn(),
    signOut: jest.fn(),
    getUser: jest.fn().mockResolvedValue({ 
      data: { user: { id: 'mock-user-id', email: 'admin@test.com' } }, 
      error: null 
    }),
  },
  rpc: jest.fn().mockResolvedValue({ data: [], error: null }),
}));

export const supabase = createClient(); 