/**
 * Tarot Card Data - Major Arcana (22 cards)
 * Each card has upright and reversed meanings
 */

export interface TarotCard {
  id: number;
  name: string;
  number: number;
  upright: {
    meaning: string;
    keywords: string[];
  };
  reversed: {
    meaning: string;
    keywords: string[];
  };
  description: string;
}

export const MAJOR_ARCANA: TarotCard[] = [
  {
    id: 0,
    name: 'The Fool',
    number: 0,
    upright: {
      meaning: 'New beginnings, innocence, spontaneity, a free spirit. The Fool represents a new journey, fresh start, or leap of faith. Trust in the universe and embrace the unknown.',
      keywords: ['New beginnings', 'Innocence', 'Spontaneity', 'Free spirit', 'Adventure'],
    },
    reversed: {
      meaning: 'Recklessness, risk-taking, naivety, poor judgment. You may be acting without thinking or taking unnecessary risks. Slow down and consider the consequences.',
      keywords: ['Recklessness', 'Naivety', 'Poor judgment', 'Risk-taking', 'Foolishness'],
    },
    description: 'The Fool marks the beginning of a journey, full of potential and possibilities.',
  },
  {
    id: 1,
    name: 'The Magician',
    number: 1,
    upright: {
      meaning: 'Manifestation, resourcefulness, power, inspired action. You have all the tools you need to succeed. Focus your will and make things happen.',
      keywords: ['Manifestation', 'Resourcefulness', 'Power', 'Inspired action', 'Willpower'],
    },
    reversed: {
      meaning: 'Manipulation, poor planning, untapped talents. You may be misusing your power or not using your abilities to their full potential.',
      keywords: ['Manipulation', 'Poor planning', 'Untapped talents', 'Trickery', 'Lack of focus'],
    },
    description: 'The Magician represents the power to manifest your desires through focused will.',
  },
  {
    id: 2,
    name: 'The High Priestess',
    number: 2,
    upright: {
      meaning: 'Intuition, sacred knowledge, divine feminine, the subconscious mind. Trust your inner voice and pay attention to your dreams and intuition.',
      keywords: ['Intuition', 'Sacred knowledge', 'Divine feminine', 'Subconscious', 'Mystery'],
    },
    reversed: {
      meaning: 'Secrets, disconnected from intuition, withdrawal, silence. You may be ignoring your inner wisdom or keeping secrets that need to be revealed.',
      keywords: ['Secrets', 'Disconnected', 'Withdrawal', 'Silence', 'Repressed intuition'],
    },
    description: 'The High Priestess represents inner wisdom, intuition, and the mysteries of the subconscious.',
  },
  {
    id: 3,
    name: 'The Empress',
    number: 3,
    upright: {
      meaning: 'Femininity, beauty, nature, nurturing, abundance. A time of growth, creativity, and connection with nature. Fertility in all aspects of life.',
      keywords: ['Femininity', 'Beauty', 'Nature', 'Nurturing', 'Abundance', 'Fertility'],
    },
    reversed: {
      meaning: 'Creative block, dependence on others, smothering, emptiness. You may be neglecting your creative side or becoming too dependent on others.',
      keywords: ['Creative block', 'Dependence', 'Smothering', 'Emptiness', 'Infertility'],
    },
    description: 'The Empress represents abundance, nurturing, and the creative power of nature.',
  },
  {
    id: 4,
    name: 'The Emperor',
    number: 4,
    upright: {
      meaning: 'Authority, establishment, structure, a father figure. Take control, establish order, and create solid foundations. Leadership and stability.',
      keywords: ['Authority', 'Establishment', 'Structure', 'Father figure', 'Leadership', 'Stability'],
    },
    reversed: {
      meaning: 'Domination, excessive control, rigidity, inflexibility. You may be too controlling or rigid in your approach. Learn to be more flexible.',
      keywords: ['Domination', 'Excessive control', 'Rigidity', 'Inflexibility', 'Tyranny'],
    },
    description: 'The Emperor represents authority, structure, and the establishment of order.',
  },
  {
    id: 5,
    name: 'The Hierophant',
    number: 5,
    upright: {
      meaning: 'Spiritual wisdom, religious beliefs, conformity, tradition, conventional values. Seek guidance from traditional sources or mentors.',
      keywords: ['Spiritual wisdom', 'Religious beliefs', 'Conformity', 'Tradition', 'Mentorship'],
    },
    reversed: {
      meaning: 'Personal beliefs, freedom, challenging the status quo, non-conformity. Break free from limiting traditions and find your own path.',
      keywords: ['Personal beliefs', 'Freedom', 'Non-conformity', 'Rebellion', 'Unconventional'],
    },
    description: 'The Hierophant represents tradition, spiritual guidance, and conventional wisdom.',
  },
  {
    id: 6,
    name: 'The Lovers',
    number: 6,
    upright: {
      meaning: 'Love, harmony, relationships, values alignment, choices. A significant relationship or important decision about values and beliefs.',
      keywords: ['Love', 'Harmony', 'Relationships', 'Values', 'Choices', 'Union'],
    },
    reversed: {
      meaning: 'Self-love, disharmony, imbalance, misalignment of values. You may need to focus on self-love or realign your values in relationships.',
      keywords: ['Self-love', 'Disharmony', 'Imbalance', 'Misalignment', 'Bad choices'],
    },
    description: 'The Lovers represent love, relationships, and important choices based on values.',
  },
  {
    id: 7,
    name: 'The Chariot',
    number: 7,
    upright: {
      meaning: 'Control, willpower, success, action, determination. You have the drive and determination to overcome obstacles and achieve your goals.',
      keywords: ['Control', 'Willpower', 'Success', 'Action', 'Determination', 'Victory'],
    },
    reversed: {
      meaning: 'Lack of control, lack of direction, aggression, no direction. You may be losing control or acting without clear direction.',
      keywords: ['Lack of control', 'No direction', 'Aggression', 'Discipline', 'Defeat'],
    },
    description: 'The Chariot represents willpower, determination, and the drive to succeed.',
  },
  {
    id: 8,
    name: 'Strength',
    number: 8,
    upright: {
      meaning: 'Strength, courage, persuasion, influence, compassion. Inner strength, patience, and the ability to overcome challenges with grace.',
      keywords: ['Strength', 'Courage', 'Persuasion', 'Influence', 'Compassion', 'Patience'],
    },
    reversed: {
      meaning: 'Weakness, self-doubt, inner strength, raw emotion. You may be doubting yourself or need to find your inner strength.',
      keywords: ['Weakness', 'Self-doubt', 'Inner strength', 'Raw emotion', 'Insecurity'],
    },
    description: 'Strength represents inner power, courage, and the ability to overcome challenges.',
  },
  {
    id: 9,
    name: 'The Hermit',
    number: 9,
    upright: {
      meaning: 'Soul searching, introspection, being alone, inner guidance. Time for reflection, seeking answers within, and spiritual enlightenment.',
      keywords: ['Soul searching', 'Introspection', 'Alone', 'Inner guidance', 'Enlightenment'],
    },
    reversed: {
      meaning: 'Isolation, withdrawal, rejection, returning to society. You may be isolating yourself too much or need to reconnect with others.',
      keywords: ['Isolation', 'Withdrawal', 'Rejection', 'Loneliness', 'Disconnection'],
    },
    description: 'The Hermit represents introspection, inner guidance, and spiritual seeking.',
  },
  {
    id: 10,
    name: 'Wheel of Fortune',
    number: 10,
    upright: {
      meaning: 'Good luck, karma, life cycles, destiny, a turning point. Change is coming, and the wheel of fortune is turning in your favor.',
      keywords: ['Good luck', 'Karma', 'Life cycles', 'Destiny', 'Turning point', 'Change'],
    },
    reversed: {
      meaning: 'Bad luck, resistance to change, breaking cycles. You may be resisting necessary change or experiencing a downturn.',
      keywords: ['Bad luck', 'Resistance', 'Breaking cycles', 'Misfortune', 'No control'],
    },
    description: 'The Wheel of Fortune represents cycles, destiny, and the turning of fate.',
  },
  {
    id: 11,
    name: 'Justice',
    number: 11,
    upright: {
      meaning: 'Justice, fairness, truth, cause and effect, law. Fairness, accountability, and the consequences of your actions. Truth will be revealed.',
      keywords: ['Justice', 'Fairness', 'Truth', 'Cause and effect', 'Law', 'Accountability'],
    },
    reversed: {
      meaning: 'Unfairness, lack of accountability, dishonesty, unfair treatment. Injustice or lack of accountability in a situation.',
      keywords: ['Unfairness', 'No accountability', 'Dishonesty', 'Unfair treatment', 'Injustice'],
    },
    description: 'Justice represents fairness, truth, and the consequences of actions.',
  },
  {
    id: 12,
    name: 'The Hanged Man',
    number: 12,
    upright: {
      meaning: 'Pause, surrender, letting go, new perspectives. Time to pause, let go of control, and see things from a new angle. Sacrifice for greater good.',
      keywords: ['Pause', 'Surrender', 'Letting go', 'New perspectives', 'Sacrifice', 'Waiting'],
    },
    reversed: {
      meaning: 'Stalling, needless sacrifice, resistance, stalling. You may be stalling unnecessarily or making needless sacrifices.',
      keywords: ['Stalling', 'Needless sacrifice', 'Resistance', 'Delays', 'Indecision'],
    },
    description: 'The Hanged Man represents surrender, new perspectives, and letting go.',
  },
  {
    id: 13,
    name: 'Death',
    number: 13,
    upright: {
      meaning: 'Endings, change, transformation, transition. The end of a cycle and the beginning of something new. Transformation and rebirth.',
      keywords: ['Endings', 'Change', 'Transformation', 'Transition', 'Rebirth', 'Letting go'],
    },
    reversed: {
      meaning: 'Resistance to change, unable to move on, delaying the inevitable. You may be resisting necessary change or holding onto the past.',
      keywords: ['Resistance', 'Unable to move on', 'Delaying', 'Stagnation', 'Fear of change'],
    },
    description: 'Death represents transformation, endings, and the natural cycle of change.',
  },
  {
    id: 14,
    name: 'Temperance',
    number: 14,
    upright: {
      meaning: 'Balance, moderation, patience, purpose. Find balance, practice moderation, and be patient. Everything in its time.',
      keywords: ['Balance', 'Moderation', 'Patience', 'Purpose', 'Harmony', 'Blending'],
    },
    reversed: {
      meaning: 'Imbalance, excess, lack of long-term vision. You may be going to extremes or lacking balance in your life.',
      keywords: ['Imbalance', 'Excess', 'No long-term vision', 'Overindulgence', 'Recklessness'],
    },
    description: 'Temperance represents balance, moderation, and finding the middle path.',
  },
  {
    id: 15,
    name: 'The Devil',
    number: 15,
    upright: {
      meaning: 'Shadow self, attachment, addiction, restriction, bondage. You may be bound by material desires, addictions, or limiting beliefs.',
      keywords: ['Shadow self', 'Attachment', 'Addiction', 'Restriction', 'Bondage', 'Materialism'],
    },
    reversed: {
      meaning: 'Releasing limiting beliefs, exploring dark thoughts, detachment. Breaking free from limitations and exploring your shadow side.',
      keywords: ['Releasing', 'Exploring dark thoughts', 'Detachment', 'Freedom', 'Breaking chains'],
    },
    description: 'The Devil represents bondage, attachment, and the shadow aspects of the self.',
  },
  {
    id: 16,
    name: 'The Tower',
    number: 16,
    upright: {
      meaning: 'Sudden change, upheaval, chaos, revelation, awakening. A sudden disruption that shatters illusions and brings truth to light.',
      keywords: ['Sudden change', 'Upheaval', 'Chaos', 'Revelation', 'Awakening', 'Disaster'],
    },
    reversed: {
      meaning: 'Fear of change, personal transformation, avoiding disaster. You may be avoiding necessary change or experiencing internal transformation.',
      keywords: ['Fear of change', 'Personal transformation', 'Avoiding disaster', 'Resistance'],
    },
    description: 'The Tower represents sudden change, upheaval, and the shattering of illusions.',
  },
  {
    id: 17,
    name: 'The Star',
    number: 17,
    upright: {
      meaning: 'Hope, faith, purpose, renewal, spirituality. A time of hope, healing, and renewed faith. Your wishes are coming true.',
      keywords: ['Hope', 'Faith', 'Purpose', 'Renewal', 'Spirituality', 'Inspiration'],
    },
    reversed: {
      meaning: 'Lack of faith, despair, disconnection, discouragement. You may be losing hope or feeling disconnected from your purpose.',
      keywords: ['Lack of faith', 'Despair', 'Disconnection', 'Discouragement', 'Hopelessness'],
    },
    description: 'The Star represents hope, faith, and spiritual renewal.',
  },
  {
    id: 18,
    name: 'The Moon',
    number: 18,
    upright: {
      meaning: 'Illusion, fear, anxiety, subconscious, intuition. Hidden fears, illusions, and the need to trust your intuition in uncertain times.',
      keywords: ['Illusion', 'Fear', 'Anxiety', 'Subconscious', 'Intuition', 'Uncertainty'],
    },
    reversed: {
      meaning: 'Release of fear, repressed emotion, inner confusion. You may be releasing old fears or dealing with repressed emotions.',
      keywords: ['Release of fear', 'Repressed emotion', 'Inner confusion', 'Clarity'],
    },
    description: 'The Moon represents illusion, fear, and the mysteries of the subconscious.',
  },
  {
    id: 19,
    name: 'The Sun',
    number: 19,
    upright: {
      meaning: 'Positivity, fun, warmth, success, vitality. Joy, success, and positive energy. Everything is going well and you feel alive.',
      keywords: ['Positivity', 'Fun', 'Warmth', 'Success', 'Vitality', 'Joy', 'Enlightenment'],
    },
    reversed: {
      meaning: 'Inner child, feeling down, overly optimistic. You may need to reconnect with your inner child or are being overly optimistic.',
      keywords: ['Inner child', 'Feeling down', 'Overly optimistic', 'Lack of joy'],
    },
    description: 'The Sun represents joy, success, and positive energy.',
  },
  {
    id: 20,
    name: 'Judgment',
    number: 20,
    upright: {
      meaning: 'Reflection, evaluation, awakening, renewal, purpose. Time for reflection, self-evaluation, and awakening to your life purpose.',
      keywords: ['Reflection', 'Evaluation', 'Awakening', 'Renewal', 'Purpose', 'Forgiveness'],
    },
    reversed: {
      meaning: 'Lack of self-awareness, doubt, self-judgment, inability to learn from mistakes. You may be too self-critical or unable to learn from past mistakes.',
      keywords: ['Lack of awareness', 'Doubt', 'Self-judgment', 'Unable to learn', 'Guilt'],
    },
    description: 'Judgment represents reflection, awakening, and the call to higher purpose.',
  },
  {
    id: 21,
    name: 'The World',
    number: 21,
    upright: {
      meaning: 'Completion, accomplishment, travel, achievement, fulfillment. The completion of a cycle, achievement, and fulfillment. You have reached your goal.',
      keywords: ['Completion', 'Accomplishment', 'Travel', 'Achievement', 'Fulfillment', 'Success'],
    },
    reversed: {
      meaning: 'Incompletion, lack of closure, inability to move on, not learning lessons. You may be unable to complete something or move on from the past.',
      keywords: ['Incompletion', 'Lack of closure', 'Unable to move on', 'Stagnation'],
    },
    description: 'The World represents completion, achievement, and fulfillment of goals.',
  },
];

/**
 * Get a random tarot card
 */
export function getRandomCard(): TarotCard {
  const randomIndex = Math.floor(Math.random() * MAJOR_ARCANA.length);
  return MAJOR_ARCANA[randomIndex];
}

/**
 * Get a card by ID
 */
export function getCardById(id: number): TarotCard | undefined {
  return MAJOR_ARCANA.find((card) => card.id === id);
}

/**
 * Determine if card is reversed (50% chance)
 */
export function isReversed(): boolean {
  return Math.random() < 0.5;
}
