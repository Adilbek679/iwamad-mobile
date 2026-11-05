export type CampusEvent = { id: number; title: string; date: string; place: string; seats: number }

export const events: CampusEvent[] = [
  { id: 1, title: 'React study night', date: '2026-10-29', place: 'Room 302', seats: 20 },
  { id: 2, title: 'Almaty hackathon warm-up', date: '2026-11-03', place: 'Main hall', seats: 40 },
  { id: 3, title: 'Figma tokens workshop', date: '2026-11-07', place: 'Design lab', seats: 12 },
  { id: 4, title: 'Career talk: junior developer', date: '2026-11-12', place: 'Room 118', seats: 2 },
  { id: 5, title: 'Git and pull requests clinic', date: '2026-11-19', place: 'Room 305', seats: 15 },
]
