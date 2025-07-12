import React, { useState } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import { ThemeToggle } from './components/ThemeToggle';
import { SurveySection } from './components/SurveySection';
import { Question } from './components/Question';
import { RatingScale } from './components/RatingScale';
import { MultipleChoice } from './components/MultipleChoice';
import { TextArea } from './components/TextArea';
import { LowRatingModal } from './components/LowRatingModal';
import { SurveyData, LowRatingExample } from './types/survey';
import { 
  Users, 
  Truck, 
  Calendar, 
  BarChart3, 
  MessageSquare, 
  Lightbulb, 
  Star, 
  Plus, 
  UserCheck,
  MessageCircle,
  CheckCircle,
  Send
} from 'lucide-react';

function App() {
  const [surveyData, setSurveyData] = useState<SurveyData>({
    q1: '', q2: '', q3: '', q4: '', q5: '', q6: '', q7: '', q8: '', q9: '', q10: '',
    q11: '', q12: '', q13: '', q14: '', q15: '', q16: '', q17: [], q17_other: '',
    q18: '', q19: '', q20: ''
  });

  const [lowRatingModal, setLowRatingModal] = useState<{
    isOpen: boolean;
    questionName: string;
    rating: string;
  }>({
    isOpen: false,
    questionName: '',
    rating: ''
  });

  const [lowRatingExamples, setLowRatingExamples] = useState<LowRatingExample[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field: keyof SurveyData, value: string | string[]) => {
    setSurveyData(prev => ({ ...prev, [field]: value }));
    if (errors.includes(field)) {
      setErrors(prev => prev.filter(e => e !== field));
    }
  };

  const handleLowRating = (questionName: string, rating: string) => {
    const existingExample = lowRatingExamples.find(e => e.questionName === questionName);
    setLowRatingModal({ isOpen: true, questionName, rating });
  };

  const handleLowRatingSubmit = (example: string) => {
    // Update the survey data with the rating
    setSurveyData(prev => ({ ...prev, [lowRatingModal.questionName]: lowRatingModal.rating }));
    
    // Store the example
    setLowRatingExamples(prev => [
      ...prev.filter(e => e.questionName !== lowRatingModal.questionName),
      { questionName: lowRatingModal.questionName, rating: lowRatingModal.rating, example }
    ]);
  };

  const validateForm = (): boolean => {
    const requiredFields = [
      'q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10',
      'q11', 'q12', 'q13', 'q14', 'q15', 'q16', 'q17', 'q18', 'q19', 'q20'
    ];

    const newErrors: string[] = [];

    requiredFields.forEach(field => {
      const value = surveyData[field];
      if (field === 'q17') {
        if (!Array.isArray(value) || value.length === 0) {
          newErrors.push(field);
        }
      } else if (!value || (typeof value === 'string' && value.trim() === '')) {
        newErrors.push(field);
      }
    });

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      const firstError = document.querySelector(`[data-question="${errors[0]}"]`);
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Survey Data:', surveyData);
    console.log('Low Rating Examples:', lowRatingExamples);
    
    alert('Survey submitted successfully! Thank you for your feedback.');
    setIsSubmitting(false);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
        <ThemeToggle />
        
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-6">
              <Star className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Accion Labs Customer Satisfaction Survey 2025
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Your feedback helps us strengthen our partnership and deliver greater value. 
              This survey should take approximately 10 minutes.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <SurveySection title="Accion Labs Leadership Team" icon={<Users size={20} />}>
              <Question
                number={1}
                text="How engaged is Accion Labs' Leadership Team in enabling your engagement success?"
                required
                keyAspects="Executive engagement, Strategic guidance, Escalation handling, Value-add contributions"
                error={errors.includes('q1')}
              >
                <div data-question="q1">
                  <RatingScale
                    name="q1"
                    value={surveyData.q1}
                    onChange={(value) => updateField('q1', value)}
                    onLowRating={(rating) => handleLowRating('q1', rating)}
                    lowRatingExample={lowRatingExamples.find(e => e.questionName === 'q1')?.example}
                    onEditLowRating={() => handleLowRating('q1', surveyData.q1)}
                    required
                  />
                </div>
              </Question>

              <Question
                number={2}
                text="How aligned is Accion Labs' Leadership Team with your business objectives?"
                required
                keyAspects="Business context understanding, Industry knowledge, Strategic priorities alignment"
                error={errors.includes('q2')}
              >
                <div data-question="q2">
                  <RatingScale
                    name="q2"
                    value={surveyData.q2}
                    onChange={(value) => updateField('q2', value)}
                    onLowRating={(rating) => handleLowRating('q2', rating)}
                    lowRatingExample={lowRatingExamples.find(e => e.questionName === 'q2')?.example}
                    onEditLowRating={() => handleLowRating('q2', surveyData.q2)}
                    required
                  />
                </div>
              </Question>
            </SurveySection>

            <SurveySection title="Service Delivery Excellence" icon={<Truck size={20} />}>
              <Question
                number={3}
                text="How would you rate the overall service delivery quality of Accion Labs'?"
                required
                keyAspects="Code quality, Architecture decisions, Technical expertise, Adherence to standards"
                error={errors.includes('q3')}
              >
                <div data-question="q3">
                  <RatingScale
                    name="q3"
                    value={surveyData.q3}
                    onChange={(value) => updateField('q3', value)}
                    onLowRating={(rating) => handleLowRating('q3', rating)}
                    lowRatingExample={lowRatingExamples.find(e => e.questionName === 'q3')?.example}
                    onEditLowRating={() => handleLowRating('q3', surveyData.q3)}
                    required
                  />
                </div>
              </Question>

              <Question
                number={4}
                text="How effectively does Accion Labs deliver measurable business value and impact?"
                required
                keyAspects="ROI achievement, Business outcomes, Value realization, Objectives met"
                error={errors.includes('q4')}
              >
                <div data-question="q4">
                  <RatingScale
                    name="q4"
                    value={surveyData.q4}
                    onChange={(value) => updateField('q4', value)}
                    onLowRating={(rating) => handleLowRating('q4', rating)}
                    lowRatingExample={lowRatingExamples.find(e => e.questionName === 'q4')?.example}
                    onEditLowRating={() => handleLowRating('q4', surveyData.q4)}
                    required
                  />
                </div>
              </Question>

              <Question
                number={5}
                text="How consistent is Accion Labs in meeting its delivery commitments?"
                required
                keyAspects="On-time delivery, Reliability, Quality consistency, Handling of changes"
                error={errors.includes('q5')}
              >
                <div data-question="q5">
                  <RatingScale
                    name="q5"
                    value={surveyData.q5}
                    onChange={(value) => updateField('q5', value)}
                    onLowRating={(rating) => handleLowRating('q5', rating)}
                    lowRatingExample={lowRatingExamples.find(e => e.questionName === 'q5')?.example}
                    onEditLowRating={() => handleLowRating('q5', surveyData.q5)}
                    required
                  />
                </div>
              </Question>
            </SurveySection>

            <SurveySection title="Project Governance & Cadence" icon={<Calendar size={20} />}>
              <Question
                number={6}
                text="How do you assess the value of the governance meetings with Accion Labs?"
                required
                keyAspects="Monthly meetings, Quarterly Business Review (QBR), Action items follow-through, Strategic discussions"
                error={errors.includes('q6')}
              >
                <div data-question="q6">
                  <RatingScale
                    name="q6"
                    value={surveyData.q6}
                    onChange={(value) => updateField('q6', value)}
                    onLowRating={(rating) => handleLowRating('q6', rating)}
                    lowRatingExample={lowRatingExamples.find(e => e.questionName === 'q6')?.example}
                    onEditLowRating={() => handleLowRating('q6', surveyData.q6)}
                    includeNA
                    required
                  />
                </div>
              </Question>

              <Question
                number={7}
                text="How effective is the project management and coordination by Accion Labs?"
                required
                keyAspects="Project planning, Risk management, Issue resolution, Stakeholder management"
                error={errors.includes('q7')}
              >
                <div data-question="q7">
                  <RatingScale
                    name="q7"
                    value={surveyData.q7}
                    onChange={(value) => updateField('q7', value)}
                    onLowRating={(rating) => handleLowRating('q7', rating)}
                    lowRatingExample={lowRatingExamples.find(e => e.questionName === 'q7')?.example}
                    onEditLowRating={() => handleLowRating('q7', surveyData.q7)}
                    required
                  />
                </div>
              </Question>
            </SurveySection>

            <SurveySection title="MIS & Reporting" icon={<BarChart3 size={20} />}>
              <Question
                number={8}
                text="How well does Accion Labs' reporting provide you with actionable insights?"
                required
                keyAspects="Report quality, Metrics relevance, Data accuracy, Visualization, Timeliness"
                error={errors.includes('q8')}
              >
                <div data-question="q8">
                  <RatingScale
                    name="q8"
                    value={surveyData.q8}
                    onChange={(value) => updateField('q8', value)}
                    onLowRating={(rating) => handleLowRating('q8', rating)}
                    lowRatingExample={lowRatingExamples.find(e => e.questionName === 'q8')?.example}
                    onEditLowRating={() => handleLowRating('q8', surveyData.q8)}
                    required
                  />
                </div>
              </Question>

              <Question
                number={9}
                text="How do you value the transparency and accessibility of project information provided by Accion Labs?"
                required
                keyAspects="Dashboard availability, Real-time updates, Self-service access, Data completeness"
                error={errors.includes('q9')}
              >
                <div data-question="q9">
                  <RatingScale
                    name="q9"
                    value={surveyData.q9}
                    onChange={(value) => updateField('q9', value)}
                    onLowRating={(rating) => handleLowRating('q9', rating)}
                    lowRatingExample={lowRatingExamples.find(e => e.questionName === 'q9')?.example}
                    onEditLowRating={() => handleLowRating('q9', surveyData.q9)}
                    required
                  />
                </div>
              </Question>
            </SurveySection>

            <SurveySection title="Communication & Collaboration" icon={<MessageSquare size={20} />}>
              <Question
                number={10}
                text="How effective is Accion Labs' communication and collaboration across all engagement tiers?"
                required
                keyAspects="Clarity, Frequency, Proactiveness, Appropriate channels, Responsiveness"
                error={errors.includes('q10')}
              >
                <div data-question="q10">
                  <RatingScale
                    name="q10"
                    value={surveyData.q10}
                    onChange={(value) => updateField('q10', value)}
                    onLowRating={(rating) => handleLowRating('q10', rating)}
                    lowRatingExample={lowRatingExamples.find(e => e.questionName === 'q10')?.example}
                    onEditLowRating={() => handleLowRating('q10', surveyData.q10)}
                    required
                  />
                </div>
              </Question>

              <Question
                number={11}
                text="How well does Accion Labs integrate and collaborate with your teams for mutual success/enhanced results?"
                required
                keyAspects="Teamwork, Knowledge transfer, Process adaptation, Cultural fit"
                error={errors.includes('q11')}
              >
                <div data-question="q11">
                  <RatingScale
                    name="q11"
                    value={surveyData.q11}
                    onChange={(value) => updateField('q11', value)}
                    onLowRating={(rating) => handleLowRating('q11', rating)}
                    lowRatingExample={lowRatingExamples.find(e => e.questionName === 'q11')?.example}
                    onEditLowRating={() => handleLowRating('q11', surveyData.q11)}
                    required
                  />
                </div>
              </Question>

              <Question
                number={12}
                text="Please indicate any engagement milestones and related events that you consider to be of importance in our partnership?"
                required
                error={errors.includes('q12')}
              >
                <div data-question="q12">
                  <TextArea
                    name="q12"
                    value={surveyData.q12}
                    onChange={(value) => updateField('q12', value)}
                    placeholder="Please provide your response..."
                    required
                  />
                </div>
              </Question>
            </SurveySection>

            <SurveySection title="Innovation & Value Levers" icon={<Lightbulb size={20} />}>
              <Question
                number={13}
                text="Please rate how much Accion Labs contributes to your innovation and engineering objectives?"
                required
                keyAspects="New ideas, Technology recommendations, Process improvements, Thought leadership"
                error={errors.includes('q13')}
              >
                <div data-question="q13">
                  <RatingScale
                    name="q13"
                    value={surveyData.q13}
                    onChange={(value) => updateField('q13', value)}
                    onLowRating={(rating) => handleLowRating('q13', rating)}
                    lowRatingExample={lowRatingExamples.find(e => e.questionName === 'q13')?.example}
                    onEditLowRating={() => handleLowRating('q13', surveyData.q13)}
                    required
                  />
                </div>
              </Question>

              <Question
                number={14}
                text="How do you value Accion Labs' advisory services to your organization?"
                required
                keyAspects="Architecture Value Board (AVB), Program Value Board (PVB), STAG consultations"
                error={errors.includes('q14')}
              >
                <div data-question="q14">
                  <RatingScale
                    name="q14"
                    value={surveyData.q14}
                    onChange={(value) => updateField('q14', value)}
                    onLowRating={(rating) => handleLowRating('q14', rating)}
                    lowRatingExample={lowRatingExamples.find(e => e.questionName === 'q14')?.example}
                    onEditLowRating={() => handleLowRating('q14', surveyData.q14)}
                    includeNA
                    required
                  />
                </div>
              </Question>
            </SurveySection>

            <SurveySection title="Overall Satisfaction Index" icon={<Star size={20} />}>
              <Question
                number={15}
                text="Please indicate the overall performance of Accion Labs' team."
                required
                keyAspects="Technical skills, Ownership mindset, Professionalism, THRIVE values (Total Ownership, Humility, Results-oriented, Innovation, Value creation, Empathy)"
                error={errors.includes('q15')}
              >
                <div data-question="q15">
                  <RatingScale
                    name="q15"
                    value={surveyData.q15}
                    onChange={(value) => updateField('q15', value)}
                    onLowRating={(rating) => handleLowRating('q15', rating)}
                    lowRatingExample={lowRatingExamples.find(e => e.questionName === 'q15')?.example}
                    onEditLowRating={() => handleLowRating('q15', surveyData.q15)}
                    required
                  />
                </div>
              </Question>

              <Question
                number={16}
                text="Overall, how satisfied are you with Accion Labs as your trusted technology partner?"
                required
                keyAspects="Overall partnership satisfaction"
                error={errors.includes('q16')}
              >
                <div data-question="q16">
                  <RatingScale
                    name="q16"
                    value={surveyData.q16}
                    onChange={(value) => updateField('q16', value)}
                    onLowRating={(rating) => handleLowRating('q16', rating)}
                    lowRatingExample={lowRatingExamples.find(e => e.questionName === 'q16')?.example}
                    onEditLowRating={() => handleLowRating('q16', surveyData.q16)}
                    required
                  />
                </div>
              </Question>
            </SurveySection>

            <SurveySection title="Additional Services" icon={<Plus size={20} />}>
              <Question
                number={17}
                text="Which of these Accion Labs' services would add value to your organization? (Check all that apply)"
                required
                error={errors.includes('q17')}
              >
                <div data-question="q17">
                  <MultipleChoice
                    name="q17"
                    value={surveyData.q17}
                    onChange={(value) => updateField('q17', value)}
                    type="checkbox"
                    options={[
                      { value: 'avb', label: 'Architecture Value Board sessions (AVB)' },
                      { value: 'pvb', label: 'Program Value Board sessions (PVB)' },
                      { value: 'stag', label: 'Strategy & Technology Advisory Group (STAG) consultations' },
                      { value: 'roadmap', label: 'Technology roadmap planning' },
                      { value: 'pilots', label: 'Emerging technology pilots' },
                      { value: 'training', label: 'Training and capability building' },
                      { value: 'idlc', label: 'Innovation and Design Lifecycle Workshop (IDLC)' },
                      { value: 'other', label: 'Other', hasOther: true },
                    ]}
                    otherValue={surveyData.q17_other}
                    onOtherChange={(value) => updateField('q17_other', value)}
                    required
                  />
                </div>
              </Question>
            </SurveySection>

            <SurveySection title="Reference Program" icon={<UserCheck size={20} />}>
              <Question
                number={18}
                text="Will you be willing to be Accion Labs' reference customer?"
                required
                error={errors.includes('q18')}
              >
                <div data-question="q18">
                  <MultipleChoice
                    name="q18"
                    value={surveyData.q18}
                    onChange={(value) => updateField('q18', value)}
                    options={[
                      { value: 'reference', label: 'Yes, as a reference for prospective clients' },
                      { value: 'testimonial', label: 'Yes, for case studies or testimonials' },
                      { value: 'future', label: 'In the near future' },
                      { value: 'no', label: 'No' },
                    ]}
                    required
                  />
                </div>
              </Question>
            </SurveySection>

            <SurveySection title="Open Feedback" icon={<MessageCircle size={20} />}>
              <Question
                number={19}
                text="Please share your suggestions on how Accion Labs can improve to be a better partner for you?"
                required
                keyAspects="What works well? Where can we improve? Any team members to recognize? How can we better support your goals?"
                error={errors.includes('q19')}
              >
                <div data-question="q19">
                  <TextArea
                    name="q19"
                    value={surveyData.q19}
                    onChange={(value) => updateField('q19', value)}
                    placeholder="Please provide your response..."
                    required
                  />
                </div>
              </Question>

              <Question
                number={20}
                text="Please highlight the 'Best of Accion Labs' that you would like to share - people, etc?"
                required
                error={errors.includes('q20')}
              >
                <div data-question="q20">
                  <TextArea
                    name="q20"
                    value={surveyData.q20}
                    onChange={(value) => updateField('q20', value)}
                    placeholder="Please provide your response..."
                    required
                  />
                </div>
              </Question>
            </SurveySection>

            <div className="flex justify-center pt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="
                  px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold
                  rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105
                  hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-4
                  focus:ring-green-500/50 disabled:opacity-50 disabled:cursor-not-allowed
                  disabled:transform-none flex items-center space-x-2
                "
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle size={20} />
                    <span>Submit Survey</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        <LowRatingModal
          isOpen={lowRatingModal.isOpen}
          onClose={() => {
            // If closing/canceling, deselect the rating if it was 1 or 2
            if (lowRatingModal.rating === '1' || lowRatingModal.rating === '2') {
              setSurveyData(prev => ({ ...prev, [lowRatingModal.questionName]: '' }));
            }
            setLowRatingModal({ isOpen: false, questionName: '', rating: '' });
          }}
          onSubmit={handleLowRatingSubmit}
          rating={lowRatingModal.rating}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;