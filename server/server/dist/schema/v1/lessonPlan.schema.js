"use strict";
// topic: string;
// additionalInstructions: string;
// standards: string;
// outputLanguage: string;
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateLessonPlanSchema = exports.addFavoriteSchema = exports.LessonPlanSchema = void 0;
const zod_1 = require("zod");
exports.LessonPlanSchema = zod_1.z.object({
    topic: zod_1.z.string({ required_error: "Topic is required" }),
    additionalInstructions: zod_1.z.string({
        required_error: "Additional instructions are required",
    }),
    standards: zod_1.z.string({ required_error: "Standards are required" }),
    outputLanguage: zod_1.z.string().default("english"),
});
exports.addFavoriteSchema = zod_1.z.string({ required_error: "Lesson plan id is required" });
exports.generateLessonPlanSchema = zod_1.z.object({
    lessonOverview: zod_1.z.object({
        title: zod_1.z.string().describe("Name of the lesson"),
        subject: zod_1.z.string().describe("Curriculum area and specific topic"),
        gradeLevel: zod_1.z.string().describe("Target audience grade level or age group"),
        duration: zod_1.z.string().describe("Estimated time for completion"),
        instructor: zod_1.z.string().describe("Name of the lesson facilitator"),
    }),
    learningObjectives: zod_1.z.array(zod_1.z.object({
        objective: zod_1.z.string().describe("The learning objective"),
        bloomsTaxonomyLevel: zod_1.z.string().describe("Associated Bloom's Taxonomy level"),
        assessmentMethod: zod_1.z.string().describe("How this objective will be assessed"),
    })).describe("Clear, measurable goals using Bloom's Taxonomy verbs"),
    curriculumAlignment: zod_1.z.object({
        standards: zod_1.z.array(zod_1.z.object({
            code: zod_1.z.string().describe("Standard reference code"),
            description: zod_1.z.string().describe("Full text of the standard"),
            category: zod_1.z.string().describe("Category or domain of the standard"),
        })).describe("Referenced educational standards").optional(),
        competencies: zod_1.z.array(zod_1.z.object({
            area: zod_1.z.string().describe("Competency area"),
            description: zod_1.z.string().describe("Detailed description of the competency"),
            indicators: zod_1.z.array(zod_1.z.string()).describe("Observable indicators of competency"),
        })).describe("Specific curriculum competencies addressed").optional(),
    }).optional(),
    materialsAndResources: zod_1.z.array(zod_1.z.object({
        type: zod_1.z.string().describe("Type of resource (textbook, handout, technology, etc)"),
        name: zod_1.z.string().describe("Name/description of the resource"),
        quantity: zod_1.z.string().describe("Amount needed if applicable").optional(),
        preparation: zod_1.z.string().describe("Required preparation steps").optional(),
        alternativeOptions: zod_1.z.array(zod_1.z.string()).describe("Alternative resources that could be used").optional(),
        links: zod_1.z.array(zod_1.z.object({
            url: zod_1.z.string(),
            description: zod_1.z.string(),
        })).describe("Related online resources").optional(),
    })).optional(),
    prerequisiteKnowledge: zod_1.z.object({
        concepts: zod_1.z.array(zod_1.z.object({
            topic: zod_1.z.string().describe("Main prerequisite topic"),
            details: zod_1.z.array(zod_1.z.string()).describe("Specific knowledge points within the topic").optional(),
            importance: zod_1.z.string().describe("Why this prerequisite is important").optional(),
            reviewStrategy: zod_1.z.string().describe("How to quickly review this prerequisite").optional(),
        })).optional(),
        skills: zod_1.z.array(zod_1.z.object({
            skill: zod_1.z.string().describe("Required skill"),
            proficiencyLevel: zod_1.z.string().describe("Expected level of proficiency").optional(),
            practiceActivities: zod_1.z.array(zod_1.z.string()).describe("Quick practice activities").optional(),
        })).optional(),
        priorLessons: zod_1.z.array(zod_1.z.object({
            lessonTitle: zod_1.z.string().describe("Title of related prior lesson"),
            keyPoints: zod_1.z.array(zod_1.z.string()).describe("Important points to remember").optional(),
        })).optional(),
    }).describe("Detailed breakdown of required prior knowledge and skills").optional(),
    lessonStructure: zod_1.z.object({
        introduction: zod_1.z.object({
            hook: zod_1.z.object({
                activity: zod_1.z.string().describe("Attention-grabbing opening activity"),
                duration: zod_1.z.string().describe("Time allocated for hook").optional(),
                materials: zod_1.z.array(zod_1.z.string()).describe("Materials needed for hook").optional(),
            }),
            priorKnowledgeConnection: zod_1.z.object({
                connections: zod_1.z.array(zod_1.z.string()).describe("Specific connections to previous learning").optional(),
                activationStrategy: zod_1.z.string().describe("How to activate prior knowledge").optional(),
            }).optional(),
        }),
        instruction: zod_1.z.object({
            teachingMethods: zod_1.z.array(zod_1.z.object({
                method: zod_1.z.string().describe("Teaching method name"),
                description: zod_1.z.string().describe("How to implement this method"),
                duration: zod_1.z.string().describe("Time allocated for this method").optional(),
            })).optional(),
            keyPoints: zod_1.z.array(zod_1.z.object({
                concept: zod_1.z.string().describe("Main concept"),
                details: zod_1.z.array(zod_1.z.string()).describe("Supporting details").optional(),
                examples: zod_1.z.array(zod_1.z.string()).describe("Illustrative examples").optional(),
            })),
        }),
        guidedPractice: zod_1.z.array(zod_1.z.object({
            activity: zod_1.z.string().describe("Collaborative learning activity"),
            duration: zod_1.z.string().describe("Time allocated for this activity").optional(),
            grouping: zod_1.z.string().describe("How students should be grouped").optional(),
            instructions: zod_1.z.array(zod_1.z.string()).describe("Step-by-step instructions").optional(),
            materials: zod_1.z.array(zod_1.z.string()).describe("Required materials").optional(),
            checkpoints: zod_1.z.array(zod_1.z.string()).describe("Points to check understanding").optional(),
        })).optional(),
        independentPractice: zod_1.z.array(zod_1.z.object({
            activity: zod_1.z.string().describe("Individual student activity"),
            instructions: zod_1.z.array(zod_1.z.string()).describe("Detailed step-by-step instructions").optional(),
            duration: zod_1.z.string().describe("Expected time for completion").optional(),
            deliverables: zod_1.z.array(zod_1.z.string()).describe("Expected outputs").optional(),
            successCriteria: zod_1.z.array(zod_1.z.string()).describe("What success looks like").optional(),
        })).optional(),
        assessment: zod_1.z.object({
            formative: zod_1.z.array(zod_1.z.object({
                method: zod_1.z.string().describe("Assessment method"),
                timing: zod_1.z.string().describe("When to implement").optional(),
                questions: zod_1.z.array(zod_1.z.string()).describe("Specific check questions").optional(),
            })).optional(),
            summative: zod_1.z.array(zod_1.z.object({
                method: zod_1.z.string().describe("Assessment method"),
                description: zod_1.z.string().describe("Detailed description").optional(),
                criteria: zod_1.z.array(zod_1.z.string()).describe("Success criteria").optional(),
            })).optional(),
        }).optional(),
        closure: zod_1.z.object({
            summary: zod_1.z.object({
                keyPoints: zod_1.z.array(zod_1.z.string()).describe("Main points to recap"),
                method: zod_1.z.string().describe("How to conduct the summary").optional(),
            }),
            reflection: zod_1.z.array(zod_1.z.object({
                question: zod_1.z.string().describe("Reflection question"),
                purpose: zod_1.z.string().describe("Why this question is important").optional(),
                followUp: zod_1.z.array(zod_1.z.string()).describe("Follow-up questions").optional(),
            })).optional(),
        }).optional(),
    }),
    differentiation: zod_1.z.object({
        advancedLearners: zod_1.z.array(zod_1.z.object({
            strategy: zod_1.z.string().describe("Extension strategy"),
            activities: zod_1.z.array(zod_1.z.string()).describe("Specific activities").optional(),
            resources: zod_1.z.array(zod_1.z.string()).describe("Additional resources needed").optional(),
        })).optional(),
        strugglingLearners: zod_1.z.array(zod_1.z.object({
            support: zod_1.z.string().describe("Support strategy"),
            scaffolding: zod_1.z.array(zod_1.z.string()).describe("Scaffolding techniques").optional(),
            resources: zod_1.z.array(zod_1.z.string()).describe("Support resources").optional(),
        })).optional(),
        accommodations: zod_1.z.array(zod_1.z.object({
            type: zod_1.z.string().describe("Type of accommodation"),
            description: zod_1.z.string().describe("Detailed description").optional(),
            implementation: zod_1.z.array(zod_1.z.string()).describe("How to implement").optional(),
        })).optional(),
    }).optional(),
    assessment: zod_1.z.object({
        criteria: zod_1.z.array(zod_1.z.object({
            criterion: zod_1.z.string().describe("Assessment criterion"),
            weight: zod_1.z.number().describe("Relative importance").optional(),
            indicators: zod_1.z.array(zod_1.z.string()).describe("Success indicators").optional(),
        })).optional(),
        rubric: zod_1.z.array(zod_1.z.object({
            criterion: zod_1.z.string(),
            levels: zod_1.z.array(zod_1.z.object({
                score: zod_1.z.number(),
                description: zod_1.z.string(),
                examples: zod_1.z.array(zod_1.z.string()).describe("Examples of this level").optional(),
            })).optional(),
        })).optional(),
        feedbackMethod: zod_1.z.object({
            type: zod_1.z.string().describe("Type of feedback"),
            timing: zod_1.z.string().describe("When feedback will be provided").optional(),
            format: zod_1.z.string().describe("How feedback will be delivered").optional(),
            followUp: zod_1.z.string().describe("Follow-up actions").optional(),
        }).optional(),
    }).optional(),
    reflection: zod_1.z.object({
        strengths: zod_1.z.array(zod_1.z.object({
            aspect: zod_1.z.string().describe("What worked well"),
            evidence: zod_1.z.array(zod_1.z.string()).describe("Evidence of success").optional(),
            replication: zod_1.z.string().describe("How to replicate this success").optional(),
        })).optional(),
        improvements: zod_1.z.array(zod_1.z.object({
            area: zod_1.z.string().describe("Area for improvement"),
            strategy: zod_1.z.string().describe("How to improve").optional(),
            resources: zod_1.z.array(zod_1.z.string()).describe("Resources needed for improvement").optional(),
        })).optional(),
        notes: zod_1.z.string().describe("Additional teaching notes").optional(),
    }).optional(),
    homework: zod_1.z.object({
        assignment: zod_1.z.object({
            task: zod_1.z.string().describe("Homework task"),
            purpose: zod_1.z.string().describe("Learning purpose").optional(),
            instructions: zod_1.z.array(zod_1.z.string()).describe("Detailed instructions").optional(),
        }),
        dueDate: zod_1.z.string().describe("When the assignment is due").optional(),
        resources: zod_1.z.array(zod_1.z.object({
            name: zod_1.z.string().describe("Resource name"),
            type: zod_1.z.string().describe("Type of resource").optional(),
            access: zod_1.z.string().describe("How to access the resource").optional(),
        })).optional(),
    }).optional(),
});
