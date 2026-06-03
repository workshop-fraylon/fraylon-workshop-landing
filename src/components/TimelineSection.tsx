const STEPS = [
  {
    number: "01",
    day: "Day 1",
    date: "15 June 2026",
    phase: "Kickoff & Orientation",
    desc: "The workshop officially begins. Participants receive joining instructions, community portal access, and meet their cohort and mentors to align on goals.",
  },
  {
    number: "02",
    day: "Days 2 – 6",
    date: "16 – 21 June 2026",
    phase: "Core Live Sessions — Week 1",
    desc: "Five evening sessions of domain-focused live training. Each session runs 2 hours with hands-on tasks, mentor feedback, and daily deliverables.",
  },
  {
    number: "03",
    day: "Days 7 – 12",
    date: "22 – 27 June 2026",
    phase: "Core Live Sessions — Week 2",
    desc: "Deep-dive sessions covering advanced concepts, industry workflows, and practical activities designed to build out your core skills. Begin working on your final project.",
  },
  {
    number: "04",
    day: "Days 13 – 14",
    date: "28 – 29 June 2026",
    phase: "Project Submission",
    desc: "Complete and submit your industry-grade project. Receive a final mentor review and prepare your demo for the closing presentation.",
  },
  {
    number: "05",
    day: "Day 15",
    date: "30 June 2026",
    phase: "Demo Day & Certification",
    desc: "Present your project to a panel of mentors. Top performers are shortlisted for internships. All finishers receive their industry certificate.",
  },
];

export default function TimelineSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Workshop Timeline</h2>
        <div className="max-w-4xl mx-auto">
          {STEPS.map((step, index) => (
            <div key={index} className="mb-8 flex flex-col md:flex-row gap-4">
              <div className="md:w-1/4">
                <div className="text-xl font-bold text-blue-600">{step.number}</div>
                <div className="font-semibold">{step.day}</div>
                <div className="text-sm text-gray-500">{step.date}</div>
              </div>
              <div className="md:w-3/4">
                <h3 className="text-xl font-semibold mb-2">{step.phase}</h3>
                <p className="text-gray-700">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
