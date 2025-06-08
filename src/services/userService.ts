// src/services/userService.ts
// Serviço para manipulação do usuário fixo
import { parseClient } from './parseClient';

export interface User {
  id: string;
  name: string;
  email: string;
}

export const userService = {
  async getUser(): Promise<User> {
    const res = await fetch('/api/user', { method: 'GET' });
    if (!res.ok) throw new Error('Erro ao buscar usuário');
    return res.json();
  },
  async updateUser(data: Partial<User>): Promise<void> {
    await fetch('/api/user', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  },
};