import type React from "react";
import type {
  CreateLessonPlanData,
  LessonPlan,
} from "src/types/lessonPlan/lessonPlan";

interface LessonPlanPDFTemplateProps {
  lessonPlan: any;
  aiResponse: LessonPlan | null;
  aiPrompt: CreateLessonPlanData | null;
}

const LessonPlanPDFTemplate: React.FC<LessonPlanPDFTemplateProps> = ({
  lessonPlan,
  aiResponse,
  aiPrompt,
}) => {
  return (
    <div className="pdf-container bg-white p-8 max-w-[800px] mx-auto font-sans text-black">
      {/* Header */}
      <div className="text-center mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold mb-2">
          {lessonPlan?.title || "Lesson Plan"}
        </h1>
        <p className="text-sm text-gray-600">
          Created{" "}
          {lessonPlan?.createdAt &&
            new Date(lessonPlan.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Lesson Overview */}
      {aiResponse?.lessonOverview && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-emerald-700 border-b pb-2">
            Lesson Overview
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Title:</p>
              <p className="mb-2">{aiResponse.lessonOverview.title}</p>
            </div>
            <div>
              <p className="font-semibold">Subject:</p>
              <p className="mb-2">{aiResponse.lessonOverview.subject}</p>
            </div>
            <div>
              <p className="font-semibold">Grade Level:</p>
              <p className="mb-2">{aiResponse.lessonOverview.gradeLevel}</p>
            </div>
            <div>
              <p className="font-semibold">Duration:</p>
              <p className="mb-2">{aiResponse.lessonOverview.duration}</p>
            </div>
            {aiResponse.lessonOverview.instructor && (
              <div>
                <p className="font-semibold">Instructor:</p>
                <p className="mb-2">{aiResponse.lessonOverview.instructor}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Learning Objectives */}
      {aiResponse?.learningObjectives &&
        aiResponse.learningObjectives.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-purple-700 border-b pb-2">
              Learning Objectives
            </h2>
            <ul className="list-disc pl-5 space-y-4">
              {aiResponse.learningObjectives.map((objective, index) => (
                <li key={index} className="mb-2">
                  <p className="font-semibold">{objective.objective}</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <span className="text-sm bg-purple-50 text-purple-700 px-2 py-1 rounded">
                      {objective.bloomsTaxonomyLevel}
                    </span>
                    <span className="text-sm bg-blue-50 text-blue-700 px-2 py-1 rounded">
                      {objective.assessmentMethod}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

      {/* Curriculum Alignment */}
      {aiResponse?.curriculumAlignment?.standards &&
        aiResponse.curriculumAlignment.standards.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-blue-700 border-b pb-2">
              Curriculum Alignment
            </h2>
            <ul className="list-none space-y-4">
              {aiResponse.curriculumAlignment.standards.map(
                (standard, index) => (
                  <li
                    key={index}
                    className="border-l-4 border-blue-300 pl-3 py-1"
                  >
                    <p className="font-semibold text-blue-700">
                      {standard.code}
                    </p>
                    <p className="mb-1">{standard.description}</p>
                    {standard.category && (
                      <p className="text-sm text-gray-600">
                        Category: {standard.category}
                      </p>
                    )}
                  </li>
                )
              )}
            </ul>
          </div>
        )}

      {/* Lesson Structure */}
      {aiResponse?.lessonStructure && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-emerald-700 border-b pb-2">
            Lesson Structure
          </h2>

          {/* Introduction */}
          {aiResponse.lessonStructure.introduction && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-amber-700">
                Introduction
              </h3>

              {/* Hook */}
              {aiResponse.lessonStructure.introduction.hook && (
                <div className="mb-4 border-l-4 border-amber-300 pl-3 py-2">
                  <h4 className="font-semibold">Hook Activity</h4>
                  <p className="mb-2">
                    {aiResponse.lessonStructure.introduction.hook.activity}
                  </p>
                  {aiResponse.lessonStructure.introduction.hook.duration && (
                    <p className="text-sm text-gray-600">
                      Duration:{" "}
                      {aiResponse.lessonStructure.introduction.hook.duration}
                    </p>
                  )}
                  {aiResponse.lessonStructure.introduction.hook.materials &&
                    aiResponse.lessonStructure.introduction.hook.materials
                      .length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm font-semibold">
                          Materials Needed:
                        </p>
                        <ul className="list-disc pl-5 text-sm">
                          {aiResponse.lessonStructure.introduction.hook.materials.map(
                            (material, i) => (
                              <li key={i}>{material}</li>
                            )
                          )}
                        </ul>
                      </div>
                    )}
                </div>
              )}

              {/* Prior Knowledge Connection */}
              {aiResponse.lessonStructure.introduction
                .priorKnowledgeConnection && (
                <div className="mb-4 border-l-4 border-blue-300 pl-3 py-2">
                  <h4 className="font-semibold">Prior Knowledge Connection</h4>
                  <p className="mb-2">
                    {
                      aiResponse.lessonStructure.introduction
                        .priorKnowledgeConnection.activationStrategy
                    }
                  </p>
                  {aiResponse.lessonStructure.introduction
                    .priorKnowledgeConnection.connections && (
                    <div className="mt-2">
                      <p className="text-sm font-semibold">Connections:</p>
                      <ul className="list-disc pl-5 text-sm">
                        {aiResponse.lessonStructure.introduction.priorKnowledgeConnection.connections.map(
                          (connection, i) => (
                            <li key={i}>{connection}</li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Instruction */}
          {aiResponse.lessonStructure.instruction &&
            aiResponse.lessonStructure.instruction.teachingMethods && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-emerald-700">
                  Instruction
                </h3>
                <div className="space-y-4">
                  {aiResponse.lessonStructure.instruction.teachingMethods.map(
                    (method, index) => (
                      <div
                        key={index}
                        className="border-l-4 border-emerald-300 pl-3 py-2"
                      >
                        <div className="flex justify-between items-start">
                          <h4 className="font-semibold">
                            {index + 1}. {method.method}
                          </h4>
                          {method.duration && (
                            <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                              {method.duration}
                            </span>
                          )}
                        </div>
                        <p className="mt-2">{method.description}</p>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

          {/* Assessment */}
          {aiResponse.lessonStructure.assessment && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-indigo-700">
                Assessment
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Formative */}
                {aiResponse.lessonStructure.assessment.formative && (
                  <div>
                    <h4 className="font-semibold text-blue-700 mb-2">
                      Formative Assessment
                    </h4>
                    <div className="space-y-3">
                      {aiResponse.lessonStructure.assessment.formative.map(
                        (item, index) => (
                          <div
                            key={index}
                            className="border-l-4 border-blue-300 pl-3 py-2"
                          >
                            <h5 className="font-semibold">{item.method}</h5>
                            {item.timing && (
                              <p className="text-sm text-gray-600">
                                Timing: {item.timing}
                              </p>
                            )}
                            {item.questions && item.questions.length > 0 && (
                              <div className="mt-2">
                                <p className="text-sm font-semibold">
                                  Key Questions:
                                </p>
                                <ul className="list-disc pl-5 text-sm">
                                  {item.questions.map((q, i) => (
                                    <li key={i}>{q}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* Summative */}
                {aiResponse.lessonStructure.assessment.summative && (
                  <div>
                    <h4 className="font-semibold text-indigo-700 mb-2">
                      Summative Assessment
                    </h4>
                    <div className="space-y-3">
                      {aiResponse.lessonStructure.assessment.summative.map(
                        (item, index) => (
                          <div
                            key={index}
                            className="border-l-4 border-indigo-300 pl-3 py-2"
                          >
                            <h5 className="font-semibold">{item.method}</h5>
                            {item.description && (
                              <p className="mt-1">{item.description}</p>
                            )}
                            {item.criteria && item.criteria.length > 0 && (
                              <div className="mt-2">
                                <p className="text-sm font-semibold">
                                  Success Criteria:
                                </p>
                                <ul className="list-disc pl-5 text-sm">
                                  {item.criteria.map((c, i) => (
                                    <li key={i}>{c}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Materials and Resources */}
      {aiResponse?.materialsAndResources &&
        aiResponse.materialsAndResources.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-blue-700 border-b pb-2">
              Materials and Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {aiResponse.materialsAndResources.map((material, index) => (
                <div key={index} className="border p-3 rounded">
                  <h4 className="font-semibold">{material.name}</h4>
                  <p className="text-sm bg-gray-100 inline-block px-2 py-0.5 rounded mb-2">
                    {material.type}
                  </p>
                  {material.quantity && (
                    <p className="text-sm">Quantity: {material.quantity}</p>
                  )}
                  {material.preparation && (
                    <div className="mt-2">
                      <p className="text-sm font-semibold">Preparation:</p>
                      <p className="text-sm">{material.preparation}</p>
                    </div>
                  )}
                  {material.alternativeOptions &&
                    material.alternativeOptions.length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm font-semibold">Alternatives:</p>
                        <ul className="list-disc pl-5 text-sm">
                          {material.alternativeOptions.map((option, i) => (
                            <li key={i}>{option}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
              ))}
            </div>
          </div>
        )}

      {/* Differentiation */}
      {aiResponse?.differentiation && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-purple-700 border-b pb-2">
            Differentiation Strategies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Advanced Learners */}
            {aiResponse.differentiation.advancedLearners && (
              <div>
                <h3 className="font-semibold text-emerald-700 mb-2">
                  Advanced Learners
                </h3>
                <div className="space-y-3">
                  {aiResponse.differentiation.advancedLearners.map(
                    (item, index) => (
                      <div
                        key={index}
                        className="border-l-4 border-emerald-300 pl-3 py-2"
                      >
                        <h4 className="font-semibold">{item.strategy}</h4>
                        {item.activities && item.activities.length > 0 && (
                          <ul className="list-disc pl-5 text-sm mt-1">
                            {item.activities.map((activity, i) => (
                              <li key={i}>{activity}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Struggling Learners */}
            {aiResponse.differentiation.strugglingLearners && (
              <div>
                <h3 className="font-semibold text-amber-700 mb-2">
                  Struggling Learners
                </h3>
                <div className="space-y-3">
                  {aiResponse.differentiation.strugglingLearners.map(
                    (item, index) => (
                      <div
                        key={index}
                        className="border-l-4 border-amber-300 pl-3 py-2"
                      >
                        <h4 className="font-semibold">{item.support}</h4>
                        {item.scaffolding && item.scaffolding.length > 0 && (
                          <ul className="list-disc pl-5 text-sm mt-1">
                            {item.scaffolding.map((scaffold, i) => (
                              <li key={i}>{scaffold}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Accommodations */}
            {aiResponse.differentiation.accommodations && (
              <div>
                <h3 className="font-semibold text-blue-700 mb-2">
                  Accommodations
                </h3>
                <div className="space-y-3">
                  {aiResponse.differentiation.accommodations.map(
                    (item, index) => (
                      <div
                        key={index}
                        className="border-l-4 border-blue-300 pl-3 py-2"
                      >
                        <h4 className="font-semibold">{item.type}</h4>
                        {item.description && (
                          <p className="text-sm mt-1">{item.description}</p>
                        )}
                        {item.implementation &&
                          item.implementation.length > 0 && (
                            <ul className="list-disc pl-5 text-sm mt-1">
                              {item.implementation.map((step, i) => (
                                <li key={i}>{step}</li>
                              ))}
                            </ul>
                          )}
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Homework */}
      {aiResponse?.homework && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-amber-700 border-b pb-2">
            Homework Assignment
          </h2>
          <div className="bg-amber-50 p-4 rounded">
            <h3 className="font-semibold text-lg mb-2">
              {aiResponse.homework.assignment.task}
            </h3>
            <p className="mb-3">{aiResponse.homework.assignment.purpose}</p>

            {aiResponse.homework.dueDate && (
              <p className="text-amber-700 font-semibold mb-3">
                Due: {aiResponse.homework.dueDate}
              </p>
            )}

            {aiResponse.homework.assignment.instructions &&
              aiResponse.homework.assignment.instructions.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold mb-1">Instructions:</h4>
                  <ul className="list-decimal pl-5">
                    {aiResponse.homework.assignment.instructions.map(
                      (instruction, i) => (
                        <li key={i}>{instruction}</li>
                      )
                    )}
                  </ul>
                </div>
              )}

            {aiResponse.homework.resources &&
              aiResponse.homework.resources.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-1">Resources:</h4>
                  <ul className="list-disc pl-5">
                    {aiResponse.homework.resources.map((resource, i) => (
                      <li key={i}>
                        <span className="font-medium">{resource.name}</span>
                        {resource.type && (
                          <span className="text-sm text-gray-600">
                            {" "}
                            ({resource.type})
                          </span>
                        )}
                        {resource.access && (
                          <div className="text-sm text-blue-600">
                            {resource.access}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 mt-12 pt-4 border-t">
        <p>Generated from {aiPrompt?.topic || "lesson plan"}</p>
        <p className="mt-1">
          © {new Date().getFullYear()} Lesson Plan Generator
        </p>
      </div>
    </div>
  );
};

export default LessonPlanPDFTemplate;
