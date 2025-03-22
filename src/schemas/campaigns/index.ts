import { z } from 'zod';
import { GameSystem } from '@prisma/client';

export const CampaignSchema = z.object({
    name: z.string().min(3).max(50),
    description: z.string().max(500).optional(),
    system: z.nativeEnum(GameSystem),
    characterIds: z.array(z.string().cuid()).optional(),
    directorId: z.string(),
});

export type CampaignFormValues = z.infer<typeof CampaignSchema>;


/*
model Campaign {
  id              String        @id @default(cuid())
  name            String
  description     String?
  system          GameSystem    @default(MYTHRAS_STD)
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt
  characters      CampaignCharacter[]
  directorId      String       // Who created the campaign
  director        User         @relation(fields: [directorId], references: [id])

  // Optional campaign-specific settings
  startDate       DateTime?
  endDate         DateTime?
  status          Boolean @default(true)

  @@index([directorId])
  @@index([system])
}
*/
