// Core Interfaces
export interface LessonPlan {
  lessonOverview: LessonOverview;
  learningObjectives: LearningObjective[];
  curriculumAlignment?: CurriculumAlignment;
  materialsAndResources?: Material[];
  prerequisiteKnowledge?: PrerequisiteKnowledge;
  lessonStructure: LessonStructure;
  differentiation?: Differentiation;
  assessment?: AssessmentDetails;
  reflection?: Reflection;
  homework?: Homework;
  status: LessonPlanStatus;
}

interface LessonOverview {
  title: string;
  subject: string;
  gradeLevel: string;
  duration: string;
  instructor: string;
}

interface LearningObjective {
  objective: string;
  bloomsTaxonomyLevel: string;
  assessmentMethod: string;
}

interface CurriculumAlignment {
  standards?: CurriculumStandard[];
  competencies?: Competency[];
}

interface Competency {
  area: string;
  description: string;
  indicators: string[];
}

interface CurriculumStandard {
  code: string;
  description: string;
  category: string;
}

interface Material {
  type: string;
  name: string;
  quantity?: string;
  preparation?: string;
  alternativeOptions?: string[];
  links?: MaterialLink[];
}

interface MaterialLink {
  url: string;
  description: string;
}

interface PrerequisiteKnowledge {
  concepts?: PrerequisiteConcept[];
  skills?: PrerequisiteSkill[];
  priorLessons?: PriorLesson[];
}

interface PriorLesson {
  lessonTitle: string;
  keyPoints?: string[];
}

interface PrerequisiteConcept {
  topic: string;
  details?: string[];
  importance?: string;
  reviewStrategy?: string;
}

interface PrerequisiteSkill {
  skill: string;
  proficiencyLevel?: string;
  practiceActivities?: string[];
}

interface LessonStructure {
  introduction: Introduction;
  instruction: Instruction;
  guidedPractice?: PracticeActivity[];
  independentPractice?: PracticeActivity[];
  assessment?: Assessment;
  closure?: Closure;
}

interface Introduction {
  hook: Hook;
  priorKnowledgeConnection?: PriorKnowledgeConnection;
}

interface Hook {
  activity: string;
  duration?: string;
  materials?: string[];
}

interface PriorKnowledgeConnection {
  connections?: string[];
  activationStrategy?: string;
}

interface Instruction {
  teachingMethods?: TeachingMethod[];
  keyPoints: KeyPoint[];
}

interface TeachingMethod {
  method: string;
  description: string;
  duration?: string;
}

interface KeyPoint {
  concept: string;
  details?: string[];
  examples?: string[];
}

interface PracticeActivity {
  activity: string;
  duration?: string;
  grouping?: string;
  instructions?: string[];
  materials?: string[];
  checkpoints?: string[];
  deliverables?: string[];
  successCriteria?: string[];
}

interface Assessment {
  formative?: AssessmentItem[];
  summative?: AssessmentItem[];
}

interface AssessmentItem {
  method: string;
  timing?: string;
  questions?: string[];
  description?: string;
  criteria?: string[];
}

interface Closure {
  summary: {
    keyPoints: string[];
    method?: string;
  };
  reflection?: ReflectionQuestion[];
}

interface ReflectionQuestion {
  question: string;
  purpose?: string;
  followUp?: string[];
}

interface Differentiation {
  advancedLearners?: DifferentiationStrategy[];
  strugglingLearners?: DifferentiationSupport[];
  accommodations?: Accommodation[];
}

interface DifferentiationStrategy {
  strategy: string;
  activities?: string[];
  resources?: string[];
}

interface DifferentiationSupport {
  support: string;
  scaffolding?: string[];
  resources?: string[];
}

interface Accommodation {
  type: string;
  description?: string;
  implementation?: string[];
}

interface AssessmentDetails {
  criteria?: AssessmentCriterion[];
  rubric?: RubricItem[];
  feedbackMethod?: FeedbackMethod;
}

interface AssessmentCriterion {
  criterion: string;
  weight?: number;
  indicators?: string[];
}

interface RubricItem {
  criterion: string;
  levels?: RubricLevel[];
}

interface RubricLevel {
  score: number;
  description: string;
  examples?: string[];
}

interface FeedbackMethod {
  type: string;
  timing?: string;
  format?: string;
  followUp?: string;
}

interface Reflection {
  strengths?: ReflectionStrength[];
  improvements?: ReflectionImprovement[];
  notes?: string;
}

interface ReflectionStrength {
  aspect: string;
  evidence?: string[];
  replication?: string;
}

interface ReflectionImprovement {
  area: string;
  strategy?: string;
  resources?: string[];
}

interface Homework {
  assignment: {
    task: string;
    purpose?: string;
    instructions?: string[];
  };
  dueDate?: string;
  resources?: HomeworkResource[];
}

interface HomeworkResource {
  name: string;
  type?: string;
  access?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasMore: boolean;
}

export interface CreateLessonPlanData {
  topic: string;
  additionalInstructions: string;
  standards: string;
  outputLanguage: string;
}

export interface LessonPlanResponse {
  id: string;
  userId: string;
  title: string;
  aiPrompt: string;
  aiResponse: string;
  isDeleted: boolean;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
  favorites?: any[];
  status: LessonPlanStatus;
}


export enum LessonPlanStatus {
  DRAFT = "DRAFT",
  GENERATED = "GENERATED",
  TAUGHT = "TAUGHT",
  AWAITING_ASSIGNMENT = "AWAITING_ASSIGNMENT",
  COMPLETED = "COMPLETED"
}