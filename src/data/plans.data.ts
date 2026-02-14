import type { Plan } from '@/types/plans.types';

export const PLANS: Plan[] = [
  {
    id: 1,
    name: 'ЛАЙТ',
    price: 250,
    features: [
      { id: 1, text: 'Кино и сериалы на каждый день', isActive: true },
      { id: 2, text: 'Суперхиты', isActive: false },
      { id: 3, text: 'Всё для детей', isActive: false },
      { id: 4, text: 'Образовательные передачи', isActive: false },
      { id: 5, text: 'Amediateka и Start', isActive: false },
    ],
  },
  {
    id: 2,
    name: 'ОПТИМУМ',
    price: 300,
    features: [
      { id: 1, text: 'Кино и сериалы на каждый день', isActive: true },
      { id: 2, text: 'Суперхиты', isActive: true },
      { id: 3, text: 'Всё для детей', isActive: true },
      { id: 4, text: 'Образовательные передачи', isActive: false },
      { id: 5, text: 'Amediateka и Start', isActive: false },
    ],
  },
  {
    id: 3,
    name: 'ПРЕМИУМ',
    price: 400,
    features: [
      { id: 1, text: 'Кино и сериалы на каждый день', isActive: true },
      { id: 2, text: 'Суперхиты', isActive: true },
      { id: 3, text: 'Всё для детей', isActive: true },
      { id: 4, text: 'Образовательные передачи', isActive: true },
      { id: 5, text: 'Amediateka и Start', isActive: true },
    ],
  },
];
