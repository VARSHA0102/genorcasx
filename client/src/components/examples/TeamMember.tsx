import TeamMember from '../TeamMember';
import engineerImage from '@assets/generated_images/Male_engineer_headshot_260d43bc.png';
import researcherImage from '@assets/generated_images/Female_AI_researcher_headshot_57e56034.png';
import scientistImage from '@assets/generated_images/Male_data_scientist_headshot_da570fbb.png';

export default function TeamMemberExample() {
  return (
    <div className="p-8 bg-gradient-to-br from-background to-muted/20 min-h-screen">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <TeamMember
          name="Alex Johnson"
          role="Senior AI Engineer"
          bio="Specializes in machine learning algorithms and neural network optimization with 8+ years of experience."
          image={engineerImage}
          social={{
            linkedin: "https://linkedin.com/in/alexjohnson",
            github: "https://github.com/alexjohnson",
            twitter: "https://twitter.com/alexjohnson"
          }}
        />
        <TeamMember
          name="Sarah Chen"
          role="AI Research Scientist"
          bio="PhD in Computer Science focusing on natural language processing and deep learning research."
          image={researcherImage}
          social={{
            linkedin: "https://linkedin.com/in/sarahchen",
            github: "https://github.com/sarahchen"
          }}
        />
        <TeamMember
          name="Michael Rodriguez"
          role="Data Science Lead"
          bio="Expert in data analytics, statistical modeling, and business intelligence with Fortune 500 experience."
          image={scientistImage}
          social={{
            linkedin: "https://linkedin.com/in/michaelrodriguez",
            twitter: "https://twitter.com/michaelrodriguez"
          }}
        />
      </div>
    </div>
  );
}