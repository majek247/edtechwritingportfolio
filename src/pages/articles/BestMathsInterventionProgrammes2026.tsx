"use client";

import { useEffect, useRef, useState } from "react";

const sources = [["Third Space Learning: maths intervention programmes", "https://thirdspacelearning.com/tutoring/maths-intervention-programmes/"], ["Third Space Learning: published school pricing", "https://thirdspacelearning.com/pricing/"], ["Third Space Learning: school case studies", "https://thirdspacelearning.com/"], ["Maths-Whizz: platform", "https://whizz.com/"], ["Eedi: diagnostic maths learning", "https://eedi.com/"], ["Catch Up Numeracy: programme", "https://www.catchup.org/"], ["123maths: schools", "https://123maths.co.uk/how-it-works/schools/"], ["Ark Mathematics Mastery: EEF evaluation", "https://educationendowmentfoundation.org.uk/projects-and-evaluation/projects/mathematics-mastery/"], ["NumBots: maths fluency", "https://numbots.com/"]] as const;

type Vendor = {
  id: string;
  name: string;
  tag: string;
  best: string;
  summary: string;
  priceShort: string;
  watch: string;
  intro: string[];
  features: [string, string][];
  pros: [string, string][];
  cons: [string, string][];
   pricing: string;
  pricingUrl?: string;
  review: {
    quote?: string;
    person?: string;
    role?: string;
    source: number;
    body: string;
    reviewUrl?: string;
  };
  verdict: string;
  refs: number[];
  quote?: string;
  quotePerson?: string;
  quoteRole?: string;
  image?: string;
};



const vendors: Vendor[] = [
  {
    id: "third-space",
    name: "Third Space Learning (Skye)",
    tag: "Spoken one-to-one AI maths intervention",
    best: "Schools with more pupils needing individual maths support than their current teaching assistants and intervention timetable can realistically accommodate.",
    summary: "Pupils speak with Skye, an AI maths tutor, during individual lessons. It checks understanding, listens to their answers and uses hints and step-by-step explanations when they get stuck.",
    priceShort: "From £3,500/year, with unlimited pupils and sessions.",
    watch: "Schools still need devices, headsets and an adult supervising in-school sessions.",
      intro: [
      "I think the most interesting thing about Skye is that it tries to solve a problem schools have been dealing with for years.",
      "We know that children who are falling behind often benefit from having someone work through the maths with them individually. Someone who can see where they’re getting confused, explain the method and give them another chance to try.",
      "The problem is that most schools can’t offer that level of attention to everyone who needs it.",
      "And that’s where Third Space Learning comes in.",
      "Skye is a spoken AI maths tutor, so instead of sitting in front of another set of practice questions, pupils work through lessons by talking to it. If they make a mistake, the tutor can offer a hint, break the problem into smaller steps or explain the method.",
      "I also like that the lessons are written by maths teachers rather than generated from scratch by the AI. There’s a defined curriculum behind the conversations, with content for Years 3–6, Year 7 and GCSE.",
    ],
    features: [
      ["Targeted gap assessment", "Skye uses diagnostic assessments to work out which maths skills pupils need help with, making it easier to target intervention without repeating lessons they already understand."],
      ["Conversational maths tutoring", "Pupils can work through questions aloud and get spoken explanations, hints and follow-up questions when they get stuck, rather than simply being shown the correct answer."],
      ["Flexible intervention delivery", "Schools can schedule regular tutoring or add extra sessions when needed, with several pupils receiving individual support at the same time without needing a separate tutor for each child."],
      ["Pupil progress tracking", "Teachers can see which topics pupils have covered, where they’re making progress and what they’re still struggling with, without having to record every session themselves."],
    ],
    pros: [
      ["More individual support", "Schools can offer regular one-to-one maths tutoring to more pupils without having to find additional teaching assistants or external tutors for every session."],
      ["Help beyond marking answers", "Pupils can talk through their thinking and get further explanations when they make mistakes, which is useful for children who need more guidance than another set of practice questions."],
      ["More flexibility with sessions", "Schools can increase tutoring for pupils who need more time or practice without paying for additional lessons, since unlimited sessions are included in the annual subscription."],
    ],
    cons: [
      ["Not every pupil will enjoy spoken tutoring", "Some children may find talking to a device uncomfortable or struggle to explain their thinking aloud. I’d want to test it with pupils who have SEND, EAL or communication needs before committing to a wider rollout."],
      ["Teachers still need to act on the reports", "The platform can show where pupils are struggling, but someone still needs to review that information and decide whether to change the intervention, revisit a topic or provide direct adult support."],
    ],
    pricing: "Skye starts at £3,500 per year for one-form entry primary schools, rising to £5,000 for two-form entry and £6,000 for three-form entry. Secondary school pricing is £5,000 annually, excluding VAT.",
    pricingUrl: "https://thirdspacelearning.com/pricing/",
    review: {
      source: 3,
      body: "Wormley CofE Primary School in Hertfordshire reported using Skye to extend tutoring across Years 4, 5 and 6. Its published case study records 138 pupils receiving 2,169 one-to-one sessions across the reporting period, with an annual subscription of £5,000.",
   reviewUrl: "https://thirdspacelearning.com/case-studies/wormley-primary-review/",
    },
    verdict: "My first shortlist choice when staffing capacity is the barrier to regular individual support. I would run a supervised pilot and compare pupil learning, engagement and workload with the intervention currently in place.",
    refs: [1, 2, 3],
    image: "/images/thirdspacelearningbesthero.png",
    quote: "The biggest benefit for us is that now all students can have it because it’s unlimited for a much lower cost",
    quotePerson: "Deb Harris",
    quoteRole: "Assistant Head and Maths Lead, Wormley CofE",
  },
  {
    id: "maths-whizz",
    name: "Maths-Whizz",
    tag: "Adaptive online maths tutoring",
    best: "Primary schools that want pupils to follow personalised maths lessons based on their individual understanding, with regular independent learning and progress tracking.",
    summary: "An initial assessment identifies strengths and gaps. The virtual tutor then selects interactive lessons and adapts the learning pathway as pupils progress. Teachers can monitor results and provide additional support.",
    priceShort: "School quote required. A four-week pilot is available.",
    watch: "I’d check the recommended weekly usage and how staff support pupils who repeatedly struggle.",
      intro: [
      "One thing I like about Maths-Whizz is that it doesn’t assume two pupils in the same year group should be learning the same maths.",
      "Think about a Year 5 class. One child might understand fractions but still struggle with multiplication. Another could be confident with multiplication but get stuck whenever decimals come up. They might both be below the expected standard, but putting them through the same intervention lessons wouldn’t necessarily help either of them.",
      "Maths-Whizz starts by assessing what each pupil already knows.",
      "From there, its virtual tutor builds an individual learning pathway, with interactive lessons, explanations and activities matched to their current understanding. As pupils improve, the programme adjusts what they work on next.",
    ],
        features: [
      ["Initial maths assessment", "Maths-Whizz assesses pupils across different maths topics to work out what they already understand and where they’re falling behind. Each child gets a starting point based on their knowledge rather than simply their year group."],
      ["Adaptive maths tutoring", "Pupils work through interactive lessons with animations, explanations and practice questions. The virtual tutor adjusts their learning pathway as they improve, so they’re not continually repeating topics they’ve already mastered."],
      ["Regular independent learning", "Schools can build Maths-Whizz into weekly intervention sessions or independent learning time. Pupils follow their own activities, with rewards and challenges to encourage them to keep practising."],
      ["Teacher progress reporting", "Teachers can see how much time pupils spend learning, which topics they’ve covered and how their Maths Age is changing. They can also use the reports to identify children who need additional help."],
    ],
    pros: [
      ["Lessons matched to individual ability", "Pupils don’t have to work through the same activities simply because they’re in the same class. Maths-Whizz can give each child lessons based on their understanding, including topics from earlier year groups."],
      ["Easier to provide regular practice", "Once pupils are familiar with the platform, they can work through individual lessons without a teacher delivering every activity. That makes it easier to support different learning needs during the same session."],
      ["Useful information for teachers", "I like that teachers can see more than whether a pupil has logged in. Reports show progress across maths topics, which can help staff identify gaps and decide what needs revisiting in class."],
    ],
    cons: [
      ["Regular use needs protecting", "Maths-Whizz recommends 45–60 minutes a week, so schools need to make room for it in the timetable. I’d also want someone checking that pupils are completing meaningful learning, rather than just logging in and working through activities."],
      ["Some pupils may still need direct teaching", "The interactive lessons provide explanations and support, but I’d want to see what happens when a child repeatedly struggles with the same concept. Some pupils may still need a teacher to sit with them, explain the maths differently or work through a misconception."],
    ],
    pricing: "Maths-Whizz provides school pricing by quotation, depending on the number of pupils, the implementation and the support required. Schools can also request a free four-week pilot before committing.",
   
    review: {
      source: 4,
      body: "The EEF's 2026 evaluation involved 63 schools across England and found that pupils allocated to Maths-Whizz made an average of one additional month's progress in maths compared with pupils who weren't allocated to the programme.",
   reviewUrl: "https://educationendowmentfoundation.org.uk/projects-and-evaluation/projects/maths-whizz-23-24-trial",
    },
    verdict: "Best considered when the school can protect repeated digital practice time and wants an individual learning pathway.",
    refs: [4],
    image: "/images/mathswhizz.jpeg",
        quote: "Their focused approach helps us identify gaps, scaffold teaching, and accelerate progress especially for disadvantaged and high-attaining pupils. ",
    quotePerson: "Kim Rogers",
    quoteRole: "Director of Maths, Crofty Multi Academy Trust",
  },
  {
    id: "eedi",
    name: "Eedi",
    tag: "Misconception-led diagnostic maths learning",
    best: "Schools that want to understand why pupils are getting maths questions wrong and use that information to plan more targeted teaching and intervention.",
    summary: "Diagnostic questions help identify why pupils have chosen a particular answer. Eedi also offers AI-supported tutoring designed to guide pupils through misconceptions rather than simply marking answers.",
    priceShort: "Free school access is advertised, with paid support options also listed.",
    watch: "I’d confirm which tutoring features are included and what additional support costs.",
     intro: [
      "I’ve always thought there’s a big difference between knowing a child has got a question wrong and understanding why they got it wrong.",
      "Take a pupil who’s struggling with fractions. They might choose the wrong answer because they don’t understand equivalent fractions. Or perhaps they’re comparing the numbers in the numerator and denominator separately. Both mistakes could produce the same assessment score, but they tell a teacher very different things about what needs explaining.",
      "That’s where Eedi gets interesting.",
      "Its diagnostic questions are designed so that the incorrect answers reveal specific misconceptions. Instead of simply marking a question wrong, Eedi helps teachers understand the thinking that might have led to that answer.",
      "And it doesn't stop at the assessment.",
      "Pupils can work through recommended lessons with teaching videos, guided examples and follow-up questions. Eedi also offers tutoring support, so children who need more help aren't necessarily left to work everything out themselves.",
    ],
     features: [
      ["Diagnostic maths questions", "Eedi uses carefully designed multiple-choice questions to identify the misconceptions behind pupils’ answers. Each incorrect option is linked to a particular misunderstanding, helping teachers see what pupils may be getting wrong rather than relying on their overall scores."],
      ["Targeted follow-up lessons", "When pupils struggle with a question, they can work through teaching videos, guided examples and interactive activities that address the misunderstanding. They then answer a similar question to check whether they’ve understood the explanation."],
      ["Individual and class-level reporting", "Teachers can review how pupils answered questions, which misconceptions are appearing and where additional teaching may be needed. I’d find this particularly useful when several children are struggling with the same topic for different reasons."],
      ["Independent maths practice", "Pupils can complete recommended topics and teacher-assigned quizzes outside normal lessons. The platform also uses previous responses to recommend what they should work on next, rather than making everyone complete the same activities."],
    ],
    pros: [
      ["More useful information about mistakes", "I like that Eedi tries to explain why pupils are getting questions wrong, not just how many they missed. That gives teachers a better starting point when deciding what to revisit or how to group children for intervention."],
      ["Works alongside classroom teaching", "Teachers can use diagnostic questions before introducing a topic, check understanding afterwards or identify misconceptions that need addressing. "],
      ["Core learning tools are free", "Schools can access diagnostic questions, personalised learning and reporting without paying for a standard subscription. That makes it easier to try the programme with a class before deciding whether additional tutoring support is needed."],
    ],
    cons: [
      ["Pupils can still guess their answers", "I’d be careful about relying entirely on multiple-choice results. A child might select the correct answer without understanding it, or choose an incorrect option for a reason the system hasn’t anticipated. Teachers still need to check pupils’ reasoning, particularly when the same misconceptions keep appearing."],
      ["Additional tutoring has separate arrangements", "Eedi includes targeted lessons and practice, but live support from qualified tutors is part of Eedi Plus. I’d want to confirm which tutoring services are available to schools, what they cost and how much additional teacher involvement is needed."],
    ],
    pricing: "Eedi's core platform is free for teachers, pupils and parents, including diagnostic assessments, personalised lessons and learning activities. Eedi Plus adds on-demand live tutor support and additional reporting. Its published family pricing is £9.99 per month or £83.88 annually, equivalent to £6.99 per month.",
    pricingUrl: "https://www.eedi.com/news/new-uk-study-finds-students-using-eedi-gain-2-4-months-of-additional-maths-progresss",
    review: {
      source: 5,
      body: "A 2025 WhatWorked Education study involving 2,901 Year 7 pupils across 20 UK schools found that Eedi delivered the equivalent of two additional months of maths progress, rising to four months for pupils completing roughly one quiz a week.",
       reviewUrl: "https://educationendowmentfoundation.org.uk/projects-and-evaluation/projects/maths-whizz-23-24-trial",
    },
    verdict: "I would choose Eedi when better diagnosis and targeted reteaching matter more than outsourced individual tutoring.",
    refs: [5],
      image: "/images/eedimaths.png",
    quote: "Eedi helps to really quickly identify misconceptions and address them straight away.",
    quotePerson: "Suzanne Walsh",
    quoteRole: "Head of Numeracy, All Hallows Catholic High School",
  },

 
  {
    id: "123maths",
    name: "123maths",
    tag: "Structured arithmetic and numeracy practice",
    best: "Schools that want to help pupils strengthen basic number skills through short, structured practice sessions, particularly when gaps in earlier learning are affecting their progress.",
    summary: "Pupils work through sequenced online activities, revisiting questions until they demonstrate consistent success. Teachers can set assessments and targets and review mistakes.",
    priceShort: "From £44.50 per user/year, excluding VAT. A 30-day school trial is available.",
    watch: "I’d compare the number of licences needed with how often pupils will use them.",
       intro: [
      "One thing I think schools sometimes underestimate is how much maths a child can forget between lessons.",
      "A pupil might finally understand their number bonds on Monday, get most of Tuesday’s questions right, and then struggle with the same calculations when they come up again the following week. It’s not necessarily that the original teaching was poor. Some children simply need more opportunities to practise before something becomes familiar enough to use confidently.",
      "That’s the thinking behind 123maths.",
      "Rather than trying to cover every part of the maths curriculum, it focuses on building the number skills pupils need for more complicated work. Children move through structured activities covering number bonds, mental calculations, multiplication, division, fractions and other foundational topics.",
    ],
      features: [
      ["Structured number progression", "123maths gives pupils access to four learning programmes covering early number skills, mental arithmetic, multiplication, division, fractions, telling the time and times tables. Teachers can choose which programme a pupil works through based on the skills they need to strengthen."],
      ["Repeated practice", "Pupils work through short questions and revisit them on different days. A question is only completed after three correct answers on consecutive visits, giving children more opportunities to practise skills they haven’t fully secured."],
      ["Individual assessments and targets", "Teachers can set assessments, assign targets and leave comments that pupils see when they next log in. I like that staff can adjust what children are working towards rather than simply leave everyone to progress through the activities without oversight."],
      ["Pupil progress reporting", "Teachers can review completed work, incorrect answers and individual progress. Reports help staff see which skills pupils are managing independently and where they may need further explanation or practice."],
    ],
    pros: [
      ["Good for reinforcing basic number skills", "Some pupils need more time with number bonds, multiplication or mental calculations before they’re ready for harder topics. 123maths gives them a structured way to revisit those skills without constantly moving on to something new."],
      ["Short sessions are easier to organise", "The programme is designed around approximately 10 minutes of daily practice. Schools can fit this into morning activities, intervention slots or independent learning time without needing to plan a full additional maths lesson."],
      ["Teachers can reuse licences", "Schools can reassign a pupil’s licence once they’ve completed their books. I think that’s useful for intervention groups that change throughout the year, where one pupil may no longer need support while another is ready to begin."],
    ],
    cons: [
      ["It focuses mainly on foundational maths", "123maths is useful for strengthening number knowledge, but I wouldn’t choose it as a replacement for a broader KS2 or GCSE tutoring programme. Pupils who need extended support with reasoning, problem-solving or more advanced concepts may need additional teaching."],
      ["Repetition doesn’t replace explanation", "If a child keeps getting the same calculation wrong, I’d want someone to check whether they understand the method. The programme gives pupils repeated practice, but teachers may still need to step in, address misconceptions and explain concepts differently."],
    ],
    pricing: "123maths school subscriptions start at £44.50 per year for one user, excluding VAT. Schools can purchase licences for different numbers of pupils, with pricing adjusted according to the number of users required.",
    pricingUrl: "https://123maths.co.uk/pricing-schools/",
    review: {
      source: 7,
      body: "St George's CE Primary School in Essex is a useful example of how 123maths can fit into a normal school week. The school reported using a 21-user licence to support pupils in Years 3 to 6 who weren't making the expected progress in maths.",
    reviewUrl: "https://123maths.co.uk/testimonials/st-georges-c-e-primary-school/",
    },
    verdict: "Shortlist for number fluency, not as an automatic substitute for individual tutoring.",
    refs: [7],
      image: "/images/123maths.jpeg",
   quote: "We think 123maths is brilliant with its use of repetition and the children find it really user friendly.",
    quotePerson: "St George's CE Primary School",
    quoteRole: "Essex, UK",
  },
  {
    id: "ark",
    name: "Ark Mathematics Mastery",
    tag: "Whole-school mastery teaching approach",
    best: "Primary schools that want more consistent maths teaching across year groups, with structured resources and professional development to support pupils who are falling behind.",
    summary: "A whole-school approach combining curriculum resources, teacher development and assessment. Its Ready to Progress resources also support individual and small-group intervention.",
    priceShort: "School quote required.",
    watch: "Consider the time needed for training, implementation and ongoing curriculum development.",
     intro: [
      "One thing I find interesting about Ark Mathematics Mastery is that it looks at what happens before a child needs intervention.",
      "Think about a pupil moving from Year 3 into Year 4. They’ve learned addition using one method, with particular diagrams and language to help them understand it. Then they move into a different classroom, where the teacher explains the same ideas slightly differently. Neither teacher is necessarily doing anything wrong, but for a child who’s only just getting comfortable with the maths, those differences can make things more confusing.",
      "Multiply that across six year groups, and you can see why consistency matters.",
      "That’s what Mathematics Mastery is trying to address.",
      "Rather than giving pupils another platform to practise on, Ark provides a structured maths curriculum, teaching resources and professional development to help teachers explain mathematical concepts more consistently. There’s a strong focus on visual models, mathematical language and making sure pupils understand an idea before moving on.",
    ],
    features: [
      ["Structured maths curriculum", "Ark provides sequenced lessons, planning guides, classroom activities and assessments from Reception through Year 6. Teachers can follow a consistent approach to introducing concepts, revisiting prior knowledge and checking understanding across year groups."],
      ["Visual models and mathematical language", "Lessons use diagrams, physical resources and structured discussion to help pupils understand how the maths works. Children are encouraged to explain their reasoning, rather than simply remember a method and apply it to similar questions."],
      ["Teacher professional development", "Teachers can access training, lesson guidance, subject-specific videos and support from Ark’s maths specialists. I like that the programme works on teachers’ understanding as well as pupils’, particularly when staff are teaching topics they don’t feel completely confident explaining."],
      ["Ready to Progress interventions", "Teaching assistants can use structured videos, diagnostic quizzes and guided activities to support pupils individually or in small groups. The resources cover number and place value, addition and subtraction, and multiplication and division, with guidance on common misconceptions and how to address them."],
    ],
    pros: [
      ["More consistent teaching across year groups", "Children can encounter the same mathematical language, representations and teaching approaches as they move through school. That makes it easier to revisit earlier learning without having to explain everything using a completely different method."],
      ["Better support for teaching assistants", "I particularly like the Ready to Progress resources because they give staff something more structured than another worksheet. Teaching assistants get examples, questions to ask and guidance on misconceptions, which can make individual and small-group intervention easier to prepare and deliver."],
      ["Teachers get support alongside the resources", "The programme includes professional development, assessments and guidance from maths specialists. That’s useful for schools where improving pupils’ understanding also means helping teachers become more confident with the concepts they’re teaching."],
    ],
    cons: [
      ["It needs a proper implementation plan", "I’d be careful about treating Mathematics Mastery as something teachers can simply start using halfway through a term. Getting the most from it means agreeing on teaching approaches, completing training and making sure staff use the resources consistently. That takes time and leadership involvement."],
      ["Intervention still depends on staff availability", "Ready to Progress provides structured activities and teaching guidance, but a teacher or teaching assistant still needs to deliver the sessions. If the school is already struggling to find enough adult time for intervention, the resources won’t remove that staffing problem."],
    ],
    pricing: "Ark Curriculum Plus provides Mathematics Mastery pricing through individual school quotations, with costs depending on the support and implementation arrangements required.",
    review: {
      source: 8,
      body: "An EEF evaluation involving 5,108 Year 1 pupils across 90 schools found that Mathematics Mastery Primary delivered an average of two additional months of maths progress. However, the average impact fell to around one month when the primary and secondary trial results were combined.",
  reviewUrl: "https://educationendowmentfoundation.org.uk/projects-and-evaluation/projects/mathematics-mastery-primary",
    },
    verdict: "Best where the underlying brief is classroom teaching improvement rather than extra intervention capacity.",
    refs: [8],
      image: "/images/ark-maths-mastery.jpg",
         quote: "The Ready to Progress interventions have really supported our TAs with delivery.",
    quotePerson: "Kathryn Morgan",
    quoteRole: "Maths Lead, Weston Park Primary School",
  },

  {
    id: "numbots",
    name: "NumBots",
    tag: "Early number fluency practice",
    best: "Primary schools that want to help younger pupils develop stronger number sense, number bonds and mental addition and subtraction through short, regular practice sessions.",
    summary: "Pupils work through short, game-based activities that build understanding and recall through visual representations and repeated practice. Teachers can track usage and progress.",
    priceShort: "£113.15/year listed for a school subscription, with unlimited pupils and teachers.",
    watch: "Best considered for foundational number skills rather than broad KS2 intervention.",
     intro: [
      "I’ve always thought there’s a big difference between a child being able to answer a maths question and being comfortable enough with numbers to answer it without starting from scratch every time.",
      "Think about a Year 2 pupil working out 8 + 5. They might count on their fingers, get to 13 and give you the correct answer. That’s perfectly reasonable while they’re learning. But if they’re still counting through every calculation months later, you can imagine how difficult things become when the class moves on to larger numbers and more complicated questions.",
      "Sometimes, children don’t need another new topic. They just need more time to become confident with the number skills they’ve already been taught.",
      "That’s where NumBots comes in.",
      "Made by the same company behind Times Tables Rock Stars, NumBots focuses on number sense, number bonds, addition and subtraction. Pupils work through short games that gradually build their understanding, starting with recognising small quantities before moving on to calculations involving larger numbers.",
    ],
       features: [
      ["Foundational number skills", "NumBots begins with recognising quantities and understanding how numbers relate to one another. Pupils gradually move through number bonds, addition and subtraction, building towards mental calculations with two-digit numbers."],
      ["Visual maths activities", "Story Mode uses ten-frames, number lines, bead strings and other representations to help children understand calculations before moving towards abstract questions. Each level builds on earlier skills, so pupils don’t immediately jump into more difficult arithmetic."],
      ["Number fluency challenges", "Challenge Mode introduces short, timed activities where pupils practise recalling number facts more quickly. Children can revisit specific challenges, including number bonds and addition and subtraction, to improve their accuracy and speed."],
      ["Teacher progress reporting", "Teachers can see which levels pupils have completed, how often they’re practising and where they’re getting stuck. I’d find the alerts for children struggling with particular levels especially useful, as they show where someone might need to step in."],
    ],
    pros: [
      ["Good for building early number confidence", "Some children need more time recognising number relationships before they’re comfortable calculating mentally. NumBots starts with those foundations and gives pupils opportunities to practise them before moving on to harder questions."],
      ["Easy to fit into the school day", "The recommended sessions are short enough to use during morning activities, independent learning or at home. Schools don’t need to organise a separate teaching assistant-led session every time a pupil uses the programme."],
      ["Affordable for whole-school use", "The annual subscription covers unlimited pupils and teachers within the same school. That makes it practical to offer regular number practice across several year groups without purchasing additional licences for every pupil."],
    ],
    cons: [
      ["Limited to foundational number skills", "NumBots focuses on number sense, addition and subtraction. I wouldn’t choose it as the main intervention for a Year 6 pupil struggling with fractions, geometry or multi-step reasoning. Those children may need broader teaching support."],
      ["Practice doesn’t replace individual explanation", "I’d want teachers checking pupils who keep repeating the same level without improving. NumBots can identify where children are struggling, but someone may still need to explain the maths differently. The timed elements may also need careful introduction for pupils who require more processing time."],
    ],
    pricing: "NumBots lists its school subscription at £113.15 per year, covering unlimited pupils and teachers within the same school. Schools with an active Times Tables Rock Stars subscription can receive an annual discount of £10.95. ",
    pricingUrl: "https://numbots.com/purchase/",
    review: {
      source: 9,
      body: "In a 2021 case study, St John's Church of England Academy in Darlington described using NumBots for 20 minutes a day with Year 1 pupils, alongside number lines, Numicon and other physical resources to support classroom learning.",
    reviewUrl: "https://numbots.com/2021/03/26/year-one-wonders/",
    },
    verdict: "Appropriate as an accessible foundational supplement, not a direct replacement for a full maths tutoring programme.",
    refs: [9],
      image: "/images/numbots.webp",
      quote: "We check the red exclamation marks on a daily basis and do a quick 1:1 to get the children through their difficulty.",
    quotePerson: "Clare McAdam",
    quoteRole: "Year 1 Teacher, St John's Church of England Academy, Darlington",
  },
];



const criteria = [
  [
    "01. Can it identify specific gaps in understanding?",
    "A pupil might get six fractions questions wrong, but that doesn’t necessarily mean they need to start fractions all over again. Maybe they understand the basics but struggle with equivalent fractions. Or perhaps it’s their multiplication knowledge that’s causing the problem. I’d want to see how the programme works that out, rather than simply putting every child who gets a low score through the same lessons.",
    "rules",
    "/images/diagnostic-assessment.png"
  ],
  [
    "02. Can it explain concepts in different ways?",
    "If a pupil gets something wrong, what happens next? Do they get an explanation that helps them see where they’ve gone wrong, or just another question to attempt? And if they’re still confused, can the programme explain it in a different way?",
    "puzzle",
    "/images/spoken-maths-tutoring.png"
  ],
  [
    "03. How much help will the school need to provide?",
    "It’s easy to underestimate this part. A programme might only require 30 minutes per pupil, but someone may still need to organise the groups, prepare resources, supervise sessions and help children who get stuck. I’d want to know exactly what teachers and teaching assistants would be responsible for, especially if the school is trying to support several year groups at once.",
    "users",
    "/images/intervention-staffing.png"
  ],
  [
    "04. Can I tell whether pupils are actually improving?",
    "I’d be careful about confusing completed lessons with progress. A child might finish every activity and still struggle when the same maths comes up in class. I’d want to see whether the programme tracks what pupils understood at the beginning, what they’ve learned since and which gaps still need attention.",
    "chart",
    "/images/maths-progress-report.png"
  ],
  [
    "05. Can it support pupils with different learning needs?",
    "Not every child finds maths difficult for the same reason. Some need more time to process a question. Others struggle with the language or need to see a concept explained several ways. I’d want to know how flexible the programme is, particularly for pupils with SEND or EAL needs, and whether they can get extra help without feeling they’re constantly getting things wrong.",
    "accessibility",
    "/images/pupil-accessibility.png"
  ],
  [
    "06. What will it really cost to keep running?",
    "A programme might look affordable when you're only comparing licence fees. But if a teaching assistant needs to supervise every session, the cost looks quite different when you're supporting 90 pupils instead of 20. I'd want to know what the school still has to provide, from staff time and training to devices and preparation. ",
    "wallet",
    "/images/intervention-cost.png"
  ]
] as const;

const choices = [
  [
    "Giving more pupils regular one-to-one maths support",
    "Third Space Learning (Skye)",
    "I’d look here if teaching assistant availability is stopping pupils from receiving enough individual teaching. Skye delivers spoken one-to-one lessons, so several children can receive support at the same time without needing a separate adult for each session. The school still needs supervision, but the annual subscription includes unlimited tutoring.",
  ],
  [
    "Helping pupils catch up across different maths topics",
    "Maths-Whizz",
    "This makes sense when pupils are working at different levels and need personalised lessons they can complete regularly. I’d want the school to protect the recommended 45–60 minutes each week, though. Without that consistency, even a well-designed learning pathway might not get used enough.",
  ],
  [
    "Understanding why pupils keep making the same mistakes",
    "Eedi",
    "I’d consider Eedi when assessment scores tell teachers who’s struggling but don’t explain what’s going wrong. Its diagnostic questions can help identify misconceptions, making it easier to decide what needs reteaching.  ",
  ],
  [
    "Giving pupils more practice with foundational arithmetic",
    "123maths",
    "If children understand a calculation during lessons but struggle to remember it later, 123maths provides structured repetition across different days. I’d use it for pupils who need to secure number skills, while making sure teachers still explain anything children consistently get wrong.",
  ],
  [
    "Improving maths teaching across the whole school",
    "Ark Mathematics Mastery",
    "I’d look at Ark when the problem goes beyond individual pupils and involves how maths is taught across year groups. Its curriculum, professional development and Ready to Progress resources support more consistent teaching. It needs a bigger commitment from staff, though, and doesn’t remove the need for adults to deliver intervention.",
  ],
  [
    "Strengthening early number sense and fluency",
    "NumBots",
    "For younger pupils who are still counting through basic calculations, NumBots offers short, visual activities to help develop number understanding and recall. It’s affordable for whole-school use and easier to fit into a daily routine, but it isn’t designed to address every maths topic or misconception.",
  ],
] as const;



const iconPaths: Record<string, string[]> = {
  globe: [
    "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z",
    "M3.6 9h16.8",
    "M3.6 15h16.8",
    "M12 3a13 13 0 0 0 0 18",
    "M12 3a13 13 0 0 1 0 18",
  ],
  rules: [
    "M9 5H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-3",
    "M9 3h6v4H9z",
    "M8 12h8",
    "M8 16h5",
  ],
    accessibility: [
    "M12 5.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z",
    "M5 8.5h14",
    "M12 8.5v6",
    "M12 14.5 9 21",
    "M12 14.5 15 21",
  ],
  puzzle: [
    "M9 3h2a2 2 0 0 1 2 2v1h2a2 2 0 0 1 2 2v2h1a2 2 0 1 1 0 4h-1v2a2 2 0 0 1-2 2h-2v-1a2 2 0 1 0-4 0v1H7a2 2 0 0 1-2-2v-2H4a2 2 0 1 1 0-4h1V8a2 2 0 0 1 2-2h2V5a2 2 0 0 1 2-2Z",
  ],
  wallet: [
    "M3 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z",
    "M16 12h3",
    "M3 9h18",
  ],
  users: [
    "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
    "M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z",
    "M22 21v-2a4 4 0 0 0-3-3.87",
    "M16 3.13a4 4 0 0 1 0 7.75",
  ],
  payroll: [
    "M6 3h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z",
    "M9 7h6",
    "M9 11h6",
    "M9 15h3",
  ],
  mobile: [
    "M9 2h6a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z",
    "M11 18h2",
  ],
  chart: [
    "M4 20V4",
    "M4 20h16",
    "M8 16v-5",
    "M12 16V8",
    "M16 16v-3",
  ],
  sliders: [
    "M4 6h9",
    "M17 6h3",
    "M15 4v4",
    "M4 12h3",
    "M11 12h9",
    "M9 10v4",
    "M4 18h9",
    "M17 18h3",
    "M15 16v4",
  ],
  spark: [
    "M12 3v4",
    "M12 17v4",
    "M3 12h4",
    "M17 12h4",
    "M5.6 5.6 8.5 8.5",
    "M15.5 15.5l2.9 2.9",
    "M5.6 18.4l2.9-2.9",
    "M15.5 8.5l2.9-2.9",
    "M12 9.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z",
  ],
  check: ["M20 6 9 17l-5-5"],
  alert: [
    "M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z",
    "M12 9v4",
    "M12 17h.01",
  ],
  arrow: ["M5 12h14", "m13 6 6 6-6 6"],
  arrowRight: ["M5 12h14", "m12 5 7 7-7 7"],
  minus: ["M5 12h14"],
};

function Icon({ name, size = 20 }: { name: string; size?: number }) {
  const paths = iconPaths[name] || iconPaths.spark;
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths.map((d) => <path key={d} d={d} />)}
    </svg>
  );
}
function HeroControlRoom() {
  return (
    <figure className="gb-hero-art" aria-label="Skye maths intervention dashboard illustration">
      <img
        src="/images/best-maths-hero.png"
        alt="Illustrative Skye pupil tutoring and progress dashboard"
        width={1200}
        height={900}
        fetchPriority="high"
      />
    </figure>
  );
}

export type Props = {
  portfolioHref?: string;
  contactHref?: string;
};

const subheads = [["features", "Key capabilities"], ["pros", "Pros"], ["cons", "Limitations"], ["pricing", "Pricing"], ["reviews", "Published evidence"]] as const;

export default function BestMathsInterventionProgrammes2026({
  portfolioHref = "/#work",
  contactHref = "https://www.seo-growup.com/get-in-touch",
}: Props = {}) {
  const [active, setActive] = useState("");
  const [progress, setProgress] = useState(0);
  const [copyStatus, setCopyStatus] = useState("Copy article link ↗");
  const articleRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const update = () => {
      const node = articleRef.current;
      if (!node) return;
      const top = node.getBoundingClientRect().top + window.scrollY;
      const distance = Math.max(1, node.offsetHeight - window.innerHeight);
      setProgress(Math.round(Math.max(0, Math.min(1, (window.scrollY - top) / distance)) * 100));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-12% 0px -72% 0px" }
    );

    articleRef.current?.querySelectorAll("section[id],h3[id]").forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      observer.disconnect();
    };
  }, []);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href.split("#")[0]);
      setCopyStatus("Link copied ✓");
    } catch {
      setCopyStatus("Copy the URL from your address bar");
    }
  };

  const sourceLink = (n: number) => sources[n - 1][1];
  const jump = (id: string, label: string) => (
    <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined}>{label}</a>
  );

  return (
    <div className="gb-page" id="gb-top">
      <style>{styles}</style>
      <a className="gb-skip" href="#introduction">Skip to article</a>
      <div className="gb-progress" style={{ width: `${progress}%` }} />

      <div className="gb-wrap">
        <main>
          <header className="gb-hero">
            <div className="gb-hero-main gb-container">
              <div className="gb-hero-copy">
                <div className="gb-eyebrow">EdTech writing sample</div>
                <h1>6 Best Maths Intervention Programmes <span>for UK Schools<br/> in 2026</span></h1>
                <p className="gb-deck">Compare six maths intervention platforms, from one-to-one tutoring to adaptive learning, with a practical look at staff workload, costs and pupil progress.</p>
                <div className="gb-meta">
                  <span>By GrowUp | For Third Space Learning</span>
                  <time dateTime="2026-10">Updated October 2026</time>
                  <span>18 min read</span>
                </div>
                <a className="gb-jump" href="#shortlist">Compare the seven programmes <span>↓</span></a>
              </div>
              <HeroControlRoom />
            </div>
          </header>

          <div className="gb-strip">
            <span className="gb-eyebrow">In this guide</span>
            {vendors.map((v) => <a key={v.id} href={`#${v.id}`}>{v.name}</a>)}
          </div>

          <div className="gb-layout">
            <aside className="gb-toc">
              <div className="gb-eyebrow">On this page</div>
              <nav aria-label="Article contents">
                {jump("criteria", "What school leaders should test")}
                {jump("shortlist", "The six programmes compared")}
               
               
               
                {vendors.map((v, i) => (
                  <details key={v.id} open={active.startsWith(v.id)}>
                    <summary>{i + 1}. {v.name}</summary>
                    {jump(v.id, "Overview")}
                    {subheads.map(([id, label]) => jump(`${v.id}-${id}`, label))}
                  </details>
                ))}
                {jump("choose", "Which programme should you choose?")}
                {jump("sources", "Sources & research")}
              </nav>
              <div className="gb-toc-foot">
                {progress}% of article read
                <button className="gb-copy-button" onClick={copyLink}>{copyStatus}</button>
                <span className="gb-sr-status" role="status" aria-live="polite">{copyStatus === "Link copied ✓" ? "Copied to clipboard" : ""}</span>
              </div>
            </aside>

            <article className="gb-article" ref={articleRef}>
              <details className="gb-mobile-toc">
                <summary>Explore this guide</summary>
                <nav aria-label="Mobile article contents">
                  {jump("method", "How I compared them")}
                  {jump("criteria", "What to test")}
                  {jump("shortlist", "Compare the platforms")}
                  {vendors.map((v) => jump(v.id, v.name))}
                  {jump("choose", "Choose your shortlist")}
                </nav>
              </details>

      <section id="introduction" className="gb-intro" style={{ paddingTop: 0 }} aria-label="Introduction">
  <p className="gb-intro-lede">I’ve always thought it’s a shame how quickly a child can go from struggling with maths to deciding they’re just not good at it.</p>
  <p className="gb-intro-body">Sometimes, all it takes is one thing they didn’t understand in Year 4. Maybe it was fractions, place value or multiplication. The class moves on, the gap gets wider, and by the time the next assessment comes around, they’re struggling with questions that build on something they never properly understood in the first place.</p>
 
 
<figure className="lc-maya-search">
  <img
    src="/images/maths-intervention-challenge.png"
    alt="how a missing piece of prior knowledge follows a pupil through every subsequent topic"
    width={1200}
    height={750}
    loading="lazy"
    decoding="async"
  />
  <figcaption className="lc-maya-caption">
How a missing piece of prior knowledge follows a pupil through every subsequent topic
  </figcaption>
</figure>



  <p className="gb-intro-body" style={{ paddingTop: 15 }}>And this is where I think schools have a difficult decision to make. It’s easy enough to find a platform that gives pupils more questions to practise. But what happens when a child gets the same question wrong three times? Giving them another attempt won’t necessarily help them understand why ¾ is greater than ⅔. Sometimes they need someone to sit down, explain it differently and work through the confusion with them.</p>
  <p className="gb-intro-body">Of course, doing that for every pupil who needs help is easier said than done, especially when teaching assistants are already stretched.</p>
  <p className="gb-intro-body"><strong>So I’ve compared six maths intervention programmes based on what they actually offer struggling pupils, how much work they leave for school staff and whether they’re realistic to run week after week.</strong></p>

</section>
        

              <section id="criteria">
               <h2>What Should Schools Look For in a Maths Intervention Programme?</h2>
                 <p>I think the hardest part of choosing an intervention programme is that most of them sound good when you read through the features. They can assess pupils, personalise their learning and show you how they’re progressing. But I’d want to know what all of that looks like for a child who’s been struggling with the same topic for weeks.</p>

       
             <p style={{ marginTop: -5 }}>Here are the six practical tests I would take into a demonstration, whether the product is an AI tutor, an adaptive platform or a staff-led programme:</p>

                <div className="gb-crit">
                  {criteria.map(([title, body, icon, image], i) => (
                    <div className="gb-crit-item" key={title}>
                      <div className="gb-crit-header">
                        <span className="gb-icon"><Icon name={icon} /></span>
                        <div className="gb-crit-text">
                          <span className="gb-check-num">0{i + 1}</span>
                          <strong>{title}</strong>
                        </div>
                      </div>
                      <div className="gb-crit-content">
                        <img src={image} alt={title} className="gb-crit-image" />
                        <p>{body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section id="shortlist">
                <h2>6 Best Maths Intervention Programmes for UK Schools in 2026</h2>
                <p>Not every school needs the same kind of maths intervention. Some pupils need someone to explain a concept they haven't understood. Others need regular practice to become more confident with the basics. And sometimes it's the teachers who need better ways to spot gaps and plan support.</p>
             
               <p>Here’s how the seven compare.</p>
             
             
                <div className="gb-table-shell gb-clean-shell">
                  <div className="gb-table-scroll" role="region" aria-label="Maths intervention programme comparison table; scroll horizontally on smaller screens" tabIndex={0}>
                <table className="gb-table gb-clean">
  <thead><tr><th scope="col">Programme</th><th scope="col">Best for</th><th scope="col">How it works</th><th scope="col">Pricing and what to consider</th></tr></thead>
  <tbody>
    {vendors.map((v) => (
      <tr key={v.id}>
        <td><a href={`#${v.id}`}>{v.name} ↗</a></td>
        <td>{v.best}</td>
        <td>{v.summary}</td>
      <td><strong>{v.priceShort}</strong> {v.watch}</td>
      </tr>
    ))}
  </tbody>
</table>
                  </div>
   
                </div>
              </section>

         {vendors.map((v, i) => (
  <section
    className="gb-tool"
    id={v.id}
    key={v.id}
    aria-labelledby={`${v.id}-title`}
  >
    {/* ─────────────────────────────────────────
        VENDOR INTRO / PRODUCT VIEW
    ───────────────────────────────────────── */}
    <div className="gb-vendor-hero">

      {/* PRODUCT IMAGE PLACEHOLDER
          Replace this whole div with the real screenshot later */}
      <div
        className="gb-vendor-preview"
        aria-label={`${v.name} product interface`}
      >
        {v.image ? (
          <img
            src={v.image}
            alt={`${v.name} product screenshot`}
            className="gb-vendor-preview-image"
            loading="lazy"
          />
        ) : (
          <>
            <div className="gb-preview-window">
              <div className="gb-preview-browser">
                <span />
                <span />
                <span />
                <strong>{v.name}</strong>
              </div>

              <div className="gb-preview-app">
                <aside className="gb-preview-nav" aria-hidden="true">
                  <b>{v.name.charAt(0)}</b>
                  <span className="is-active" />
                  <span />
                  <span />
                  <span />
                  <span />
                </aside>

                <div className="gb-preview-main">
                  <div className="gb-preview-title">
                    <div>
                      <small>MATHS INTERVENTION</small>
                      <strong>Pupil progress overview</strong>
                    </div>
                    <i />
                  </div>

                  <div className="gb-preview-kpis" aria-hidden="true">
                    <div>
                      <small>Pupils</small>
                      <strong>2,842</strong>
                      <span>↑ 12%</span>
                    </div>
                    <div>
                      <small>Classes</small>
                      <strong>18</strong>
                      <span>+2</span>
                    </div>
                    <div>
                      <small>Sessions</small>
                      <strong>24</strong>
                      <span>Active</span>
                    </div>
                  </div>

                  <div className="gb-preview-dashboard" aria-hidden="true">
                    <div className="gb-preview-chart">
                      <div className="gb-preview-chart-top">
                        <span>Sessions spend</span>
                        <b>78%</b>
                      </div>

                      <div className="gb-preview-bars">
                        <i />
                        <i />
                        <i />
                        <i />
                        <i />
                        <i className="is-last" />
                      </div>
                    </div>

                    <div className="gb-preview-sidecard">
                      <small>Attendance</small>
                      <strong>96%</strong>
                      <span>Intervention cohort</span>

                      <div className="gb-preview-mini-row">
                        <i />
                        <div />
                      </div>
                      <div className="gb-preview-mini-row">
                        <i />
                        <div />
                      </div>
                      <div className="gb-preview-mini-row">
                        <i />
                        <div />
                      </div>
                    </div>
                  </div>

                  <div className="gb-preview-footer" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>
            </div>

            <div className="gb-preview-label">
              Illustrative product preview — not a real platform screenshot
            </div>
          </>
        )}
      </div>

      <div className="gb-vendor-summary">
        <div className="gb-vendor-count">
          <span>0{i + 1}</span>
          <small>of 06</small>
        </div>

        <div className="gb-tool-heading">
          <div>
            <h2 id={`${v.id}-title`}>{v.name}</h2>
            <div className="gb-eyebrow">{v.tag}</div>
          </div>
        </div>

        <div className="gb-best">
          <span>Best for</span>
          <p>{v.best}</p>
        </div>


        <div className="gb-vendor-actions">
          <a
            className="gb-vendor-primary"
            href={sourceLink(v.refs[0])}
            target="_blank"
            rel="noreferrer"
          >
            Visit {v.name}
            <Icon name="arrowRight" size={14} />
          </a>

          
        </div>


      </div>
    </div>

    {/* ─────────────────────────────────────────
        EDITORIAL REVIEW
    ───────────────────────────────────────── */}
    <div className="gb-vendor-intro">
      {v.intro.map((t, i) => (
        <p key={i} dangerouslySetInnerHTML={{ __html: t }} />
      ))}
    </div>

    {/* ─────────────────────────────────────────
        CAPABILITIES
    ───────────────────────────────────────── */}
    <div className="gb-section-heading">
      <div>
        <span className="gb-section-kicker">What it actually does</span>
        <h3 id={`${v.id}-features`}>Key capabilities</h3>
      </div>
      <span className="gb-section-side">How the programme works</span>
    </div>

    <div className="gb-feature-grid">
      {v.features.map(([title, body], featureIndex) => {
        const featureIcons = ["rules", "mobile", "chart", "payroll", "globe"];
        const iconName = featureIcons[featureIndex] || "spark";
        return (
          <div className="gb-feature-card" key={title}>
            <span className="gb-feature-number">
              <Icon name={iconName} size={20} />
            </span>

            <div>
              <strong>{title}</strong>
              <p>{body}</p>
            </div>
          </div>
        );
      })}
    </div>

    {/* ─────────────────────────────────────────
        PROS / LIMITATIONS
    ───────────────────────────────────────── */}
    <div className="gb-balance">
      <div className="gb-balance-card is-positive">
        <div className="gb-balance-heading">
          <h3 id={`${v.id}-pros`}>Pros</h3>
        </div>

        <ul>
          {v.pros.map(([t, b]) => (
            <li key={t}>
              <span className="gb-list-dot">
                <Icon name="check" size={14} />
              </span>
              <div>
                <strong>{t}</strong>
                <p>{b}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="gb-balance-card is-caution">
        <div className="gb-balance-heading">
          <h3 id={`${v.id}-cons`}>
          Limitations
          </h3>
        </div>

        <ul>
          {v.cons.map(([t, b]) => (
            <li key={t}>
              <span className="gb-list-dot">
                <Icon name="minus" size={14} />

              </span>
              <div>
                <strong>{t}</strong>
                <p>{b}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>

    {/* ─────────────────────────────────────────
        PRICING
    ───────────────────────────────────────── */}
    <div className="gb-price">
      <span className="gb-price-icon">
        <Icon name="payroll" size={19} />
      </span>

      <h3 id={`${v.id}-pricing`}>Pricing</h3>

      <div className="gb-price-body">
        <p>{v.pricing}</p>
        {v.pricingUrl && (
          <a className="gb-price-link" href={v.pricingUrl} target="_blank" rel="noreferrer">
            View pricing
            <Icon name="arrowRight" size={13} />
          </a>
        )}
      </div>
    </div>

    {/* ─────────────────────────────────────────
        CUSTOMER EVIDENCE
    ───────────────────────────────────────── */}
    <div className="gb-section-heading gb-review-heading">
      <div>
        <span className="gb-section-kicker">Research & school evidence</span>
        <h3 id={`${v.id}-reviews`}>
          What does the published evidence say about {v.name}?
        </h3>
      </div>

    </div>

    <div className="gb-review">
      <div className="gb-review-copy">
        <div className="gb-eyebrow">
          Published evidence
        </div>

        <p>{v.review.body}</p>

        <a
          href={v.review.reviewUrl ?? sourceLink(v.review.source)}
          target="_blank"
          rel="noreferrer"
        >
          Read the source <span>↗</span>
        </a>
      </div>

      <div className="gb-review-logos">
        

        {v.quote && (
          <div className="gb-review-quote">
            <span className="gb-review-quote-mark">“</span>
            <p>{v.quote}”</p>
            {v.quotePerson && (
              <div className="gb-review-quote-author">
                <strong>{v.quotePerson}</strong>
                {v.quoteRole && <span>{v.quoteRole}</span>}
              </div>
            )}
          </div>
        )}
      </div>
    </div>

    <div className="gb-sources-inline">
      {v.refs.map((n) => (
        <a href={`#source-${n}`} key={n}>
          [{n}] {sources[n - 1][0]}
        </a>
      ))}
    </div>
  </section>
))}

              <section id="choose">
                <h2>Which Maths Intervention Programme Should Your School Choose?</h2>

  <p>I don't think the best way to choose an intervention is to ask which programme has the most features. I'd start with a much simpler question: what is actually stopping these pupils from making progress?</p>

  <p>Here's how I'd narrow down the options.</p>
                
                
                
                <div className="gb-table-shell gb-clean-shell">
                  <div className="gb-table-scroll" role="region" aria-label="Shortlist maths intervention programmes by school need" tabIndex={0}>
                    <table className="gb-table gb-clean gb-choose-table">
                      <thead><tr><th scope="col">If your priority is...</th><th scope="col">Start with</th><th scope="col">Why</th></tr></thead>
                      <tbody>{choices.map(([problem, tool, test]) => <tr key={problem}><td><strong>{problem}</strong></td><td>{tool}</td><td>{test}</td></tr>)}</tbody>
                    </table>
                  </div>
                </div>

                <div className="gb-author">
                  <div className="gb-author-mark" aria-hidden="true"><span>G</span></div>
                  <div className="gb-author-body"><div className="gb-author-eyebrow">Written by</div><div className="gb-author-name">GrowUp</div><p className="gb-author-bio">GrowUp creates research-led content for education technology brands. This portfolio sample demonstrates how we'd approach a comparison for Third Space Learning, drawing on published research, school case studies and product information.</p></div>
                </div>
              </section>

              <section id="sources">
                <h2>Sources & research</h2>
                <p style={{ fontSize: 14, color: "#596a65" }}>Product descriptions and prices are based on linked vendor pages.   </p>
                <ol className="gb-source-list">{sources.map(([title, url], i) => <li key={url} id={`source-${i + 1}`}><a href={url} target="_blank" rel="noreferrer">{title} ↗</a></li>)}</ol>
              </section>
            </article>
          </div>

          <section className="gb-cta">
            <div>
              <div className="gb-eyebrow">GrowUp · EdTech content writing</div>
              <h2>Research-led EdTech content that supports evaluation and pipeline growth.</h2>
              <p>From thought leadership and SEO to product storytelling and sales enablement, we help EdTech brands communicate their value, influence buying decisions and generate pipeline.</p>
            </div>
            <div>
              <a href={contactHref}>Commission an article like this <span>↗</span></a>
            </div>
          </section>
        </main>

        <footer className="gb-footer"><a href={portfolioHref}>← Back to writing portfolio</a><a href="#gb-top">Back to top ↑</a></footer>
      </div>
    </div>
  );
}

const styles = String.raw`
.gb-page{--ink:#002924;--ink-2:#05382F;--muted:#596a65;--line:#d9dfd7;--paper:#FFFFFF;--paper-2:#F2F4EA;--orange:#1F9FA1;--pink:#FFA2A8;--teal:#6BB8A8;--teal-dark:#26797E;font-family:Inter,Arial,Helvetica,sans-serif;background:#FFFFFF;color:var(--ink);line-height:1.72;font-size:17px;-webkit-font-smoothing:antialiased}.gb-page *{box-sizing:border-box}.gb-page h1,.gb-page h2,.gb-page h3,.gb-page p,.gb-page figure,.gb-page blockquote{margin:0}.gb-page a{color:inherit;text-underline-offset:4px}.gb-page button,.gb-page input{font:inherit}.gb-page button,.gb-page summary{cursor:pointer}.gb-page :focus-visible{outline:3px solid var(--orange);outline-offset:5px}.gb-wrap{width:min(1320px,calc(100% - 96px));margin:auto}.gb-skip{position:fixed;left:18px;top:12px;z-index:90;background:#fff;padding:11px 16px;transform:translateY(-180%)}.gb-skip:focus{transform:none}.gb-progress{position:fixed;top:0;left:0;height:3px;background:var(--orange);z-index:80;transition:width .08s linear}.gb-eyebrow{text-transform:uppercase;letter-spacing:.15em;font-size:11px;font-weight:750;line-height:1.6}

.gb-hero{background:#041b1c;color:#f5f8f2;overflow:hidden;width:100vw;position:relative;left:50%;right:50%;margin-left:-50vw;margin-right:-50vw;padding-top:96px}.gb-hero:before{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px);background-size:54px 54px;mask-image:linear-gradient(to right,transparent,black 38%,black);pointer-events:none}.gb-container{width:min(1320px,calc(100% - 96px));margin:auto}.gb-hero-main{min-height:680px;display:grid;grid-template-columns:.8fr 1.2fr;gap:20px;align-items:center;padding-block:44px 62px;position:relative;z-index:2}.gb-hero-copy{position:relative;z-index:2}.gb-hero .gb-eyebrow{color:var(--orange)}.gb-hero h1{color:#F7F9F2;font-size:clamp(36px,3.5vw,56px);line-height:1.06;font-weight:650;letter-spacing:-.052em;margin:20px 0 24px;max-width:720px}.gb-hero h1 span{display:block;color:#F7F9F2}.gb-deck{font-size:18px;line-height:1.65;max-width:650px;color:#eef2ea}.gb-meta{display:flex;gap:15px;flex-wrap:wrap;margin-top:27px;font-size:12px;color:#9db1a5}.gb-jump{display:inline-flex;gap:26px;align-items:center;text-decoration:none;margin-top:27px;font-size:14px;font-weight:750;border-bottom:1px solid var(--orange);padding:4px 0;color:var(--orange)!important}.gb-hero-art{position:relative;min-width:0;width:100%;padding:24px 4px 24px 22px;margin:0}
.gb-hero-art img{display:block;width:100%;height:auto;filter:drop-shadow(0 30px 60px rgba(0,0,0,.3))}.gb-control{background:#F7F9F2;color:#002924;border:1px solid rgba(255,255,255,.25);box-shadow:0 36px 80px rgba(0,0,0,.28);border-radius:16px;overflow:hidden;transform:rotate(.35deg)}.gb-control-top{height:58px;padding:0 18px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #dfe5dc;background:#F2F4EA}.gb-control-top>div{display:flex;align-items:center;gap:11px}.gb-ben-switch{display:inline-flex;width:31px;height:31px;border-radius:50%;align-items:center;justify-content:center;background:#002924;color:#F7F9F2;font-weight:900;font-size:14px;box-shadow:inset 0 0 0 5px #05382F}.gb-control-top small{display:block;font-size:7px;letter-spacing:.15em;color:#6f7f79}.gb-control-top strong{display:block;font-size:11px;margin-top:1px}.gb-live{font-size:8px;text-transform:uppercase;letter-spacing:.12em;color:#4E7A70;display:flex;align-items:center;gap:6px}.gb-live i{width:6px;height:6px;background:#6BB8A8;border-radius:50%}.gb-control-body{padding:18px}.gb-control-kpis{display:grid;grid-template-columns:repeat(3,1fr);border:1px solid #dfe5dc;border-radius:10px;overflow:hidden;background:#fff}.gb-control-kpis>div{padding:14px 15px}.gb-control-kpis>div+div{border-left:1px solid #dfe5dc}.gb-control-kpis small{display:block;font-size:7px;text-transform:uppercase;letter-spacing:.12em;color:#83908b}.gb-control-kpis strong{display:block;font-size:22px;line-height:1.1;margin:5px 0 3px;letter-spacing:-.04em}.gb-control-kpis span{font-size:8px;color:#66766f}.gb-map-shell{height:188px;position:relative;margin-top:14px;background:#002924;border-radius:11px;overflow:hidden}.gb-map-head{height:38px;padding:0 13px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,.1);font-size:8px;color:#dbe6df}.gb-map-head span:last-child{color:#FFA2A8}.gb-map-lines{position:absolute;inset:40px 0 0;width:100%;height:148px}.gb-map-lines path{fill:none;stroke:#6BB8A8;stroke-width:1;stroke-dasharray:4 6;opacity:.55}.gb-map-lines circle{fill:#1F9FA1}.gb-map-lines circle:not(:first-of-type){fill:#F7F9F2}.gb-map-core{position:absolute;left:50%;top:53%;transform:translate(-50%,-50%);width:98px;height:76px;background:#F7F9F2;border:4px solid #05382F;border-radius:10px;display:flex;flex-direction:column;align-items:center;justify-content:center;box-shadow:0 9px 24px rgba(0,0,0,.25)}.gb-map-core span{font-size:7px;letter-spacing:.14em;color:#6f7f79}.gb-map-core strong{font-size:10px;margin:3px 0}.gb-map-core small{font-size:7px;color:#26797E}.gb-market-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px}.gb-market{display:grid;grid-template-columns:8px 1fr auto;gap:8px;align-items:center;padding:9px 10px;border:1px solid #dfe5dc;border-radius:8px;background:#fff}.gb-dot{width:7px;height:7px;border-radius:50%}.gb-dot.is-orange{background:#FF6635}.gb-dot.is-teal{background:#6BB8A8}.gb-dot.is-pink{background:#FFA2A8}.gb-market strong{display:block;font-size:9px}.gb-market small{display:block;font-size:7px;color:#88948f}.gb-market b{font-size:7px;font-weight:700;color:#4E7A70}.gb-control-alert{display:grid;grid-template-columns:auto 1fr auto;gap:10px;align-items:center;margin-top:10px;padding:11px 12px;background:#FFF4F0;border:1px solid #FFD5C8;border-radius:9px;color:#CA3A0C}.gb-control-alert strong{display:block;font-size:9px}.gb-control-alert span{display:block;font-size:7px;line-height:1.45;color:#8f4b39;margin-top:2px}.gb-control-alert button{border:0;background:#1F9FA1;color:#fff;border-radius:20px;font-size:7px;font-weight:800;padding:6px 9px}.gb-orbit-card{position:absolute;z-index:4;padding:10px 12px;border-radius:9px;box-shadow:0 16px 30px rgba(0,0,0,.22);min-width:122px}.gb-orbit-card span{display:block;font-size:7px;text-transform:uppercase;letter-spacing:.13em}.gb-orbit-card strong{display:block;font-size:9px;margin-top:2px}.gb-orbit-a{left:-5px;top:4px;background:#1F9FA1;color:#fff;transform:rotate(-3deg)}.gb-orbit-b{right:-17px;bottom:5px;background:#FFA2A8;color:#002924;transform:rotate(2.5deg)}

.gb-strip{display:flex;align-items:center;gap:24px;padding:23px 0;border-block:1px solid var(--line);font-size:14px;flex-wrap:wrap}.gb-strip .gb-eyebrow{color:#66766f;margin-right:auto}.gb-strip a{font-weight:750;text-decoration:none}.gb-layout{display:grid;grid-template-columns:235px minmax(0,850px);gap:75px;justify-content:space-between;padding-top:60px;align-items:start}.gb-toc{position:sticky;top:26px;max-height:calc(100vh - 52px);overflow-y:auto;padding-right:16px}.gb-toc>.gb-eyebrow{color:var(--muted);margin-bottom:17px}.gb-toc nav>a,.gb-toc summary{display:block;text-decoration:none;font-size:13px;padding:9px 0;line-height:1.5}.gb-toc details{border-bottom:1px solid var(--line)}.gb-toc summary{font-weight:700;list-style:none;display:flex;justify-content:space-between;gap:10px}.gb-toc summary::after{content:'+';font-weight:400;color:#4E7A70}.gb-toc details[open] summary::after{content:'−'}.gb-toc details a{display:block;font-size:12px;color:var(--muted);padding:5px 0 5px 14px;text-decoration:none}.gb-toc a[aria-current='location']{color:#26797E;font-weight:850}.gb-toc-foot{font-size:12px;border-top:1px solid var(--line);margin-top:25px;padding-top:18px;color:var(--muted)}.gb-copy-button{display:block;background:transparent;border:0;color:#26797E;padding:12px 0 0;font-size:12px;font-weight:750}.gb-sr-status{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}.gb-mobile-toc{display:none}.gb-article{min-width:0}.gb-article p{margin-bottom:21px}.gb-article section{scroll-margin-top:35px;padding-top:60px}.gb-intro p:first-child{font-size:29px;line-height:1.3;font-weight:650;letter-spacing:-.035em}.gb-article h2{font-size:36px;line-height:1.2;letter-spacing:-.045em;font-weight:650;margin-bottom:24px;text-wrap:balance}.gb-article h3{font-size:22px;line-height:1.3;letter-spacing:-.025em;margin:35px 0 18px;scroll-margin-top:35px}

.gb-stress{margin:34px 0 38px!important;padding:24px;border:1px solid #d9dfd7;border-radius:14px;background:#fff}.gb-stress-head{display:flex;justify-content:space-between;gap:20px;align-items:flex-start;margin-bottom:20px}.gb-stress-head .gb-eyebrow{color:#26797E;font-size:9px}.gb-stress-head h3{margin:5px 0 0;font-size:24px}.gb-stress-tag{font-size:9px;letter-spacing:.12em;text-transform:uppercase;border:1px solid #FF6635;color:#CA3A0C;border-radius:999px;padding:5px 10px;white-space:nowrap}.gb-stress-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:9px}.gb-stress-card{position:relative;min-height:168px;padding:16px;border:1px solid #dfe5dc;border-radius:10px;background:#F7F9F2;overflow:hidden}.gb-stress-number{font-size:10px;color:#73827c}.gb-stress-accent{position:absolute;right:14px;top:14px;width:11px;height:11px;border-radius:50%;background:#FF6635}.gb-stress-accent.is-1{background:#FFA2A8}.gb-stress-accent.is-2{background:#6BB8A8}.gb-stress-card strong{display:block;font-size:15px;margin:23px 0 5px}.gb-stress-card p{font-size:12px;line-height:1.5;margin:0 0 14px;color:#42554e}.gb-stress-card small{display:block;font-size:10px;line-height:1.45;color:#26797E;font-weight:700}.gb-stress figcaption{font-size:11px;color:#708079;border-top:1px solid #e2e7df;margin-top:18px;padding-top:14px;line-height:1.65}

.gb-method-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:28px 0}.gb-method-grid>div{padding:21px;border:1px solid #d9dfd7;background:#fff;border-radius:11px}.gb-method-grid span{font-size:10px;color:#26797E;font-weight:800}.gb-method-grid strong{display:block;font-size:16px;margin:11px 0 6px}.gb-article .gb-method-grid p{font-size:14px;line-height:1.6;color:var(--muted);margin:0}.gb-note{display:flex;gap:16px;align-items:flex-start;padding:21px 22px;background:#FFF4F0;border:1px solid #FFD5C8;border-radius:10px;margin-top:25px;color:#7c3c2a}.gb-note svg{margin-top:2px;color:#FF6635}.gb-note strong{display:block;font-size:15px;color:#7c3c2a;margin-bottom:5px}.gb-article .gb-note p{font-size:14px;line-height:1.65;margin:0;color:#7c3c2a}

.gb-crit{display:flex;flex-direction:column;gap:48px;margin-top:40px}
.gb-crit-item{display:flex;flex-direction:column;gap:24px}
.gb-crit-header{display:flex;gap:20px;align-items:center}
.gb-icon{display:inline-flex;align-items:center;justify-content:center;flex:none;width:48px;height:48px;border-radius:50%;background:#E3F4E1;color:#26797E}
.gb-crit-text{min-width:0}
.gb-check-num{display:block;font-size:11px;color:#7b8983;font-weight:650;margin-bottom:4px}
.gb-crit-text strong{display:block;font-size:22px;margin-bottom:0;letter-spacing:-.02em}
.gb-crit-content{display:grid;grid-template-columns:1fr 1fr;gap:30px;align-items:flex-start}
.gb-crit-image{width:100%;height:auto;border-radius:12px;box-shadow:0 12px 30px rgba(0,0,0,0.08);display:block}
.gb-article .gb-crit-content p{font-size:16px;line-height:1.7;margin:0;color:#011522}

.gb-table-shell{margin:34px 0}.gb-table-scroll{overflow-x:auto}.gb-table-scroll:focus{outline-offset:-3px}.gb-table{width:100%;border-collapse:separate;border-spacing:0;font-size:14px;min-width:760px;line-height:1.6}.gb-clean{background:#fff;border:1px solid #e3e8e1;border-radius:14px;overflow:hidden}.gb-clean th{background:#115f5a;color:#ffffff;font-size:10px;letter-spacing:.16em;text-transform:uppercase;font-weight:750;padding:18px 22px;border-bottom:1px solid #0d4a46;text-align:left;vertical-align:bottom}.gb-clean th:first-child{width:16%}.gb-clean td{padding:26px 22px;border-bottom:1px solid #eef1ec;vertical-align:top;color:#011522;font-size:13.5px}.gb-clean tr:last-child td{border-bottom:0}.gb-clean tbody tr{transition:background .18s ease}.gb-clean tbody tr:hover{background:#F0F5F1}.gb-clean td:first-child a{font-size:15px;font-weight:800;color:#011522;text-decoration:none;letter-spacing:-.012em;display:inline-flex;align-items:center;gap:4px;border-bottom:1px solid transparent;transition:border-color .18s ease}.gb-clean td:first-child a:hover{border-bottom-color:#167273}.gb-clean td strong{display:block;font-size:13.5px;font-weight:750;color:#011522;margin-bottom:4px;letter-spacing:-.005em}.gb-clean td small{font-size:12px;color:#011522;margin-top:6px;display:block;line-height:1.55}.gb-table-footer{font-size:12px!important;line-height:1.65;padding:18px 4px 0;color:#7b8983;margin:0!important}









/* =========================================================
   PREMIUM VENDOR REVIEW SECTIONS
========================================================= */

.gb-tool{
  border-top:1px solid #e1e7e2;
  margin-top:86px;
  padding-top:48px!important;
}


/* =========================================================
   TOP VENDOR HERO
========================================================= */

.gb-vendor-hero{
  display:grid;
  grid-template-columns:minmax(0,1.75fr) minmax(240px,.85fr);
  gap:34px;
  align-items:center;
  margin-bottom:48px;
}

.gb-vendor-preview{
  position:relative;
  min-width:0;
}

.gb-preview-window{
  overflow:hidden;
  border:1px solid #dfe6e1;
  border-radius:18px;
  background:#fff;
  box-shadow:
    0 24px 55px rgba(0,41,36,.09),
    0 2px 7px rgba(0,41,36,.04);
}

.gb-preview-browser{
  height:38px;
  display:flex;
  align-items:center;
  gap:6px;
  padding:0 13px;
  border-bottom:1px solid #e8ece9;
  background:#fbfcfb;
}

.gb-preview-browser>span{
  width:6px;
  height:6px;
  border-radius:50%;
  background:#d6ddd8;
}

.gb-preview-browser strong{
  margin-left:auto;
  font-size:8px;
  line-height:1;
  color:#66766f;
  font-weight:800;
  letter-spacing:.06em;
}

.gb-preview-app{
  min-height:332px;
  display:grid;
  grid-template-columns:66px 1fr;
}

.gb-preview-nav{
  border-right:1px solid #e9edea;
  padding:18px 13px;
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:15px;
  background:#fbfcfb;
}

.gb-preview-nav b{
  width:29px;
  height:29px;
  border-radius:9px;
  display:flex;
  align-items:center;
  justify-content:center;
  background:#063c35;
  color:#fff;
  font-size:12px;
  margin-bottom:6px;
}

.gb-preview-nav span{
  display:block;
  width:25px;
  height:7px;
  border-radius:999px;
  background:#e5ebe7;
}

.gb-preview-nav span.is-active{
  background:#bfe7da;
}

.gb-preview-main{
  padding:22px;
  background:
    radial-gradient(circle at 88% 12%,rgba(107,184,168,.08),transparent 30%),
    #fff;
}

.gb-preview-title{
  display:flex;
  align-items:flex-start;
  justify-content:space-between;
  gap:16px;
  margin-bottom:18px;
}

.gb-preview-title small{
  display:block;
  color:#779087;
  font-size:7px;
  font-weight:800;
  letter-spacing:.15em;
}

.gb-preview-title strong{
  display:block;
  margin-top:4px;
  font-size:14px;
  color:#002924;
}

.gb-preview-title i{
  width:48px;
  height:19px;
  border:1px solid #dce4df;
  border-radius:999px;
  background:#fff;
}

.gb-preview-kpis{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:9px;
}

.gb-preview-kpis>div{
  padding:12px;
  border:1px solid #e4e9e5;
  border-radius:10px;
  background:#fff;
}

.gb-preview-kpis small{
  display:block;
  font-size:7px;
  color:#819089;
}

.gb-preview-kpis strong{
  display:block;
  margin:4px 0 2px;
  font-size:17px;
  line-height:1;
  color:#002924;
}

.gb-preview-kpis span{
  font-size:7px;
  color:#148566;
}

.gb-preview-dashboard{
  display:grid;
  grid-template-columns:1.45fr .75fr;
  gap:10px;
  margin-top:10px;
}

.gb-preview-chart,
.gb-preview-sidecard{
  min-height:135px;
  padding:13px;
  border:1px solid #e4e9e5;
  border-radius:11px;
  background:#fff;
}

.gb-preview-chart-top{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:10px;
  font-size:8px;
  color:#677a72;
}

.gb-preview-chart-top b{
  color:#002924;
  font-size:12px;
}

.gb-preview-bars{
  height:75px;
  display:flex;
  align-items:flex-end;
  gap:7px;
  margin-top:16px;
  border-bottom:1px solid #edf0ee;
}

.gb-preview-bars i{
  flex:1;
  height:44%;
  border-radius:4px 4px 0 0;
  background:#dfe8e3;
}

.gb-preview-bars i:nth-child(2){height:61%}
.gb-preview-bars i:nth-child(3){height:49%}
.gb-preview-bars i:nth-child(4){height:73%}
.gb-preview-bars i:nth-child(5){height:66%}

.gb-preview-bars i.is-last{
  height:91%;
  background:#36a884;
}

.gb-preview-sidecard small{
  display:block;
  font-size:7px;
  color:#7c8d85;
}

.gb-preview-sidecard>strong{
  display:block;
  margin:4px 0 1px;
  font-size:21px;
  line-height:1;
}

.gb-preview-sidecard>span{
  display:block;
  font-size:7px;
  color:#829189;
  margin-bottom:14px;
}

.gb-preview-mini-row{
  display:grid;
  grid-template-columns:8px 1fr;
  gap:7px;
  align-items:center;
  margin-top:9px;
}

.gb-preview-mini-row i{
  width:7px;
  height:7px;
  background:#79c8ad;
  border-radius:50%;
}

.gb-preview-mini-row div{
  height:5px;
  border-radius:999px;
  background:#e5ebe7;
}

.gb-preview-footer{
  display:grid;
  grid-template-columns:1.2fr .8fr 1fr;
  gap:8px;
  margin-top:10px;
}

.gb-preview-footer span{
  height:36px;
  display:block;
  border:1px solid #e7ebe8;
  border-radius:9px;
  background:#fbfcfb;
}

.gb-preview-label{
  position:absolute;
  left:18px;
  bottom:-13px;
  padding:6px 10px;
  border:1px solid #dfe6e1;
  border-radius:999px;
  background:#fff;
  box-shadow:0 8px 20px rgba(0,41,36,.08);
  color:#71827b;
  font-size:8px;
  font-weight:750;
  letter-spacing:.09em;
  text-transform:uppercase;
}


/* =========================================================
   BRAND SUMMARY
========================================================= */

.gb-vendor-summary{
  min-width:0;
}

.gb-vendor-count{
  display:flex;
  align-items:center;
  gap:8px;
  margin-bottom:14px;
}

.gb-vendor-count span{
  display:flex;
  width:44px;
  height:44px;
  align-items:center;
  justify-content:center;
  border:none;
  border-radius:50%;
  background:transparent;
  color:#002924;
  font-size:15px;
  font-weight:800;
}

.gb-vendor-count small{
  font-size:10px;
  color:#89968f;
  text-transform:uppercase;
  letter-spacing:.14em;
}

.gb-tool-heading{
  margin:0;
}

.gb-tool-heading h2{
  margin:0;
  font-size:46px;
  line-height:1;
  letter-spacing:-.048em;
  color:#002924;
}

.gb-tool-heading .gb-eyebrow{
  margin-top:11px;
  color:#4f8175;
  font-size:10px;
  line-height:1.55;
}

.gb-best{
  margin:25px 0 18px!important;
  padding:18px 19px;
  border:none;
  border-radius:4px;
  background:#f4fbf6;
}

.gb-best>span{
  display:block;
  margin-bottom:7px;
  color:#29705f;
  font-size:10px;
  font-weight:850;
  letter-spacing:.13em;
  text-transform:uppercase;
}

.gb-article .gb-best p{
  margin:0;
  color:#0a302a;
  font-size:15px;
  line-height:1.6;
  font-weight:520;
}

.gb-signal{
  display:block;
  margin:18px 0 0;
  padding:0;
  border:0;
}

.gb-signal-label{
  display:block;
  margin-bottom:9px;
  color:#85938d;
  font-size:8px;
  font-weight:800;
  letter-spacing:.14em;
  text-transform:uppercase;
}

.gb-signal>div{
  display:flex;
  gap:7px;
  flex-wrap:wrap;
  justify-content:flex-start;
}

.gb-signal>div span,
.gb-signal>div span.is-1,
.gb-signal>div span.is-2{
  padding:5px 9px;
  border:1px solid #dce6df;
  border-radius:999px;
  background:#fff;
  color:#44665d;
  font-size:9px;
  font-weight:750;
}

.gb-vendor-actions{
  display:grid;
  grid-template-columns:1fr;
  gap:9px;
  margin-top:24px;
}

.gb-vendor-actions a{
  min-height:42px;
  padding:0 14px;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:8px;
  border-radius:8px;
  text-decoration:none;
  font-size:13px;
  font-weight:800;
}

.gb-vendor-primary{
  border:1px solid #063c35;
  background:#063c35;
  color:#fff!important;
}

.gb-vendor-secondary{
  border:1px solid #cbd8d0;
  background:#fff;
  color:#002924!important;
}


/* =========================================================
   EDITORIAL COPY
========================================================= */

.gb-vendor-intro{
  margin:45px 0 24px;
  padding-bottom:2px;
}

.gb-article .gb-vendor-intro p{
  max-width:790px;
  margin-bottom:22px;
  color:#011522;
  font-size:17px;
  line-height:1.78;
}


/* =========================================================
   SECTION HEADINGS
========================================================= */

.gb-section-heading{
  display:flex;
  align-items:flex-end;
  justify-content:space-between;
  gap:28px;
  margin:0 0 21px;
  padding-bottom:14px;
  border-bottom:1px solid #e0e6e2;
}

.gb-section-heading h3{
  margin:4px 0 0;
  font-size:25px;
  line-height:1.2;
}

.gb-section-kicker{
  display:block;
  color:#4e8175;
  font-size:8px;
  font-weight:850;
  letter-spacing:.17em;
  text-transform:uppercase;
}

.gb-section-side{
  flex:none;
  padding-bottom:4px;
  color:#8a9992;
  font-size:8px;
  font-weight:800;
  letter-spacing:.16em;
  text-transform:uppercase;
}


/* =========================================================
   CAPABILITIES
========================================================= */

.gb-feature-grid{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:14px;
  margin-bottom:38px;
}

.gb-feature-card{
  display:grid;
  grid-template-columns:50px 1fr;
  gap:16px;
  align-items:start;
  min-height:150px;
  padding:22px;
  border:1px solid #e6ece7;
  border-radius:4px;
  background:#fff;
}

.gb-feature-card:last-child:nth-child(odd){
  grid-column:1/-1;
  min-height:auto;
}

.gb-feature-number{
  display:flex;
  width:44px;
  height:44px;
  align-items:center;
  justify-content:center;
  border-radius:50%;
  background:#e6f4ec;
  color:#1a8a5f;
}

.gb-feature-card strong{
  display:block;
  margin-top:4px;
  color:#011522;
  font-size:16px;
  font-weight:700;
  line-height:1.4;
}

.gb-article .gb-feature-card p{
  margin:8px 0 0;
  color:#011522;
  font-size:13.5px;
  line-height:1.7;
}


/* =========================================================
   PROS / LIMITATIONS — LIGHTER
========================================================= */

.gb-balance{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:20px;
  margin:38px 0 44px;
}

.gb-balance-card{
  padding:28px 26px;
  border:none;
  border-radius:4px;
}

.gb-balance-card.is-positive{
  background:#eef7f2;
}

.gb-balance-card.is-caution{
  background:#fdf1ee;
}

.gb-balance-heading{
  margin-bottom:22px;
}

.gb-balance-heading h3{
  margin:0;
  font-size:20px;
  font-weight:700;
  line-height:1.3;
}

.is-positive .gb-balance-heading h3{
  color:#011522;
}

.is-caution .gb-balance-heading h3{
  color:#c8260f;
}

.gb-balance ul{
  list-style:none;
  margin:0;
  padding:0;
}

.gb-balance li{
  display:grid;
  grid-template-columns:24px 1fr;
  gap:12px;
  align-items:start;
  padding:18px 0;
}

.gb-balance li:first-child{
  padding-top:0;
}

.gb-balance li:last-child{
  padding-bottom:0;
}

.gb-list-dot{
  width:22px;
  height:22px;
  margin-top:1px;
  display:flex;
  align-items:center;
  justify-content:center;
  border-radius:50%;
  background:#167273;
  color:#fff;
}

.is-caution .gb-list-dot{
  background:#f0452a;
  color:#fff;
}

.gb-list-dot svg{
  stroke-width:2.5;
}

.gb-balance li strong{
  display:block;
  color:#011522;
  font-size:14.5px;
  font-weight:700;
  line-height:1.45;
}

.gb-article .gb-balance li p{
  margin:6px 0 0;
  color:#011522;
  font-size:13px;
  line-height:1.65;
}


/* =========================================================
   PRICING
========================================================= */

.gb-price{
  display:grid;
  grid-template-columns:42px 92px 1fr;
  gap:17px;
  align-items:start;
  margin:35px 0 48px;
  padding:20px;
  border:1px solid #dfe6e1;
  border-radius:13px;
  background:#fff;
}

.gb-price-icon{
  width:40px;
  height:40px;
  display:flex;
  align-items:center;
  justify-content:center;
  border-radius:10px;
  background:#063c35;
  color:#ffffff;
}

.gb-price h3{
  margin:6px 0 0;
  font-size:16px;
}

.gb-price-body{
  padding-left:18px;
  border-left:1px solid #e3e8e5;
}

.gb-article .gb-price p{
  margin:3px 0 0;
  color:#011522;
  font-size:13px;
  line-height:1.65;
}

.gb-price-link{
  display:inline-flex;
  align-items:center;
  gap:6px;
  margin-top:14px;
  color:#15765f!important;
  font-size:12.5px;
  font-weight:800;
  text-decoration:none;
}

.gb-price-link svg{
  transition:transform .18s ease;
}

.gb-price-link:hover svg{
  transform:translateX(3px);
}


/* =========================================================
   CUSTOMER EVIDENCE
========================================================= */

.gb-review-heading{
  margin-top:0;
}

.gb-review{
  display:grid;
  grid-template-columns:1fr 300px;
  gap:32px;
  margin:0 0 28px;
  padding:28px 30px;
  border:1px solid #dfe6e1;
  border-radius:14px;
  background:#fff;
}

.gb-review-copy{
  min-width:0;
}

.gb-review .gb-eyebrow{
  margin-bottom:12px;
  color:#4e8175;
  font-size:9px;
}

.gb-review .gb-review-person{
  margin:0 0 28px;
  color:#0a332c;
  font-size:12px;
  font-weight:800;
}

.gb-review .gb-review-person span{
  color:#7e8d87;
  font-weight:450;
}

.gb-article .gb-review p{
  margin:0;
  padding-top:2px;
  color:#011522;
  font-size:14px;
  line-height:1.72;
}

.gb-review a{
  display:inline-flex;
  align-items:center;
  gap:7px;
  margin-top:17px;
  color:#15765f;
  font-size:12.5px;
  font-weight:800;
  text-decoration:none;
}

/* Logo strip */
.gb-review-logos{
  display:flex;
  flex-direction:column;
  gap:16px;
}

.gb-review-logo-row{
  display:flex;
  align-items:center;
  gap:24px;
  padding-bottom:16px;
  border-bottom:1px solid #edf0ee;
}

.gb-review-logo{
  max-height:28px;
  max-width:120px;
  width:auto;
  object-fit:contain;
}

/* Quote card */
.gb-review-quote{
  padding:16px 18px;
  border-radius:10px;
  background:#f3f9f6;
  color:#0b5545;
}

.gb-review-quote-mark{
  display:block;
  height:24px;
  font-family:Georgia,serif;
  font-size:38px;
  line-height:1;
  color:#167273;
}

.gb-article .gb-review-quote p{
  margin:6px 0 10px;
  color:#0b5545;
  font-size:13px;
  line-height:1.5;
  font-weight:600;
}

.gb-review-quote-author{
  display:flex;
  flex-direction:column;
  gap:2px;
}

.gb-review-quote-author strong{
  color:#0b5545;
  font-size:11px;
  font-weight:800;
  line-height:1.4;
}

.gb-review-quote-author span{
  color:#4d7469;
  font-size:10px;
  font-weight:500;
  line-height:1.4;
}


/* =========================================================
   VERDICT / MY TAKE
========================================================= */

 

.gb-sources-inline{
  display:flex;
  flex-wrap:wrap;
  gap:8px 15px;
  margin-top:16px;
  padding-bottom:4px;
}

.gb-sources-inline a{
  color:#688078;
  font-size:9px;
  line-height:1.5;
  text-decoration:none;
}


.gb-choose-table{font-size:17px}.gb-choose-table th{width:auto!important}.gb-ending{margin-top:36px;padding:28px 30px;background:#FFDDDF;border-left:4px solid #FF6635;border-radius:8px}.gb-ending .gb-eyebrow{font-size:9px;color:#A4433D}.gb-ending p{font-size:18px;line-height:1.65;margin:10px 0 0;color:#5d332f}.gb-author{margin-top:48px;padding:28px 30px;background:#fff;border:1px solid #e0e5df;border-radius:14px;display:flex;gap:28px;align-items:center}.gb-author-mark{flex:none;width:64px;height:64px;border-radius:50%;background:#002924;color:#F7F9F2;display:flex;align-items:center;justify-content:center}.gb-author-mark span{font-size:26px;font-weight:900}.gb-author-body{min-width:0;padding-left:28px;border-left:1px solid #e0e5df}.gb-author-eyebrow{font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:#7e8a85;font-weight:700}.gb-author-name{font-size:18px;font-weight:800;margin-top:4px}.gb-author-bio{font-size:13px!important;line-height:1.65!important;color:#697771;margin:6px 0 0!important}.gb-source-list{padding-left:23px}.gb-source-list li{padding:8px 0;font-size:13px;color:#50635b}.gb-source-list a{word-break:break-word}

.gb-cta{margin:75px 0 35px;background:#041b1c;color:#fff;padding:50px;border-radius:5px;display:grid;grid-template-columns:1.5fr 1fr;gap:65px;align-items:center}
.gb-cta .gb-eyebrow{color:#167273}
.gb-cta h2{font-size:39px;line-height:1.13;letter-spacing:-.04em;margin:16px 0}
.gb-cta p{font-size:15px;line-height:1.75;color:#cad7c9;max-width:630px}
.gb-cta a{display:flex;align-items:center;justify-content:space-between;gap:24px;background:#167273;color:#fff;text-decoration:none;border-radius:0;padding:18px 23px;font-size:14px;font-weight:700}.gb-footer{display:flex;justify-content:space-between;gap:30px;padding:28px 0 42px;font-size:13px}.gb-footer a{text-decoration:none}

.lc-maya-search{margin:30px 0}
.lc-maya-search img{display:block;width:100%;height:auto}
.lc-maya-caption{text-align:center;font-size:12px;line-height:1.7;color:#011522;padding-top:12px;max-width:640px;margin-inline:auto}



@media(max-width:1100px){.gb-wrap,.gb-container{width:calc(100% - 40px)}.gb-hero-main{grid-template-columns:1fr;padding-inline:24px}.gb-hero-copy{max-width:760px}.gb-hero-art{max-width:760px;margin:auto}.gb-layout{display:block;padding-top:32px}.gb-toc{display:none}.gb-mobile-toc{display:block;border-bottom:1px solid var(--line);margin-bottom:32px;padding-bottom:15px}.gb-mobile-toc summary{font-size:14px;font-weight:750}.gb-mobile-toc nav{display:grid;grid-template-columns:1fr 1fr;padding-top:12px;gap:9px}.gb-mobile-toc a{font-size:13px;text-decoration:none}.gb-stress-grid{grid-template-columns:1fr 1fr}.gb-cta{grid-template-columns:1fr;gap:28px}.gb-cta a{max-width:340px}}
@media(max-width:700px){.gb-hero{padding-top:46px}.gb-hero h1{font-size:43px}.gb-deck{font-size:15px}.gb-control-kpis{grid-template-columns:1fr}.gb-control-kpis>div+div{border-left:0;border-top:1px solid #dfe5dc}.gb-market-grid{grid-template-columns:1fr}.gb-orbit-card{display:none}.gb-method-grid,.gb-balance,.gb-crit-content{grid-template-columns:1fr}.gb-feature-list li{display:block}.gb-feature-list strong{display:block;margin-bottom:5px}.gb-signal{display:block}.gb-signal>div{justify-content:flex-start;margin-top:9px}.gb-cta{padding:34px 28px}}
@media(max-width:520px){.gb-page{font-size:16px}.gb-wrap,.gb-container{width:calc(100% - 32px)}.gb-hero-main{padding-inline:0}.gb-hero h1{font-size:38px}.gb-meta{font-size:11px}.gb-hero-art{padding:18px 0}.gb-control{border-radius:11px}.gb-map-shell{height:165px}.gb-stress{padding:18px}.gb-stress-head{display:block}.gb-stress-tag{display:inline-block;margin-top:10px}.gb-stress-grid{grid-template-columns:1fr}.gb-intro p:first-child{font-size:25px}.gb-article section{padding-top:45px}.gb-article h2{font-size:29px}.gb-tool-heading h2{font-size:36px}.gb-tool-heading{gap:13px}.gb-rank{width:46px;height:46px}.gb-review{padding:22px}.gb-ending{padding:23px}.gb-author{align-items:flex-start;padding:22px;gap:18px}.gb-author-mark{width:48px;height:48px}.gb-author-body{padding-left:18px}.gb-cta h2{font-size:31px}.gb-footer{gap:20px}.gb-crit-row{padding:18px;gap:14px}.gb-crit-row:not(:last-child):after{left:41px}}

/* =========================================================
   VENDOR SECTION RESPONSIVE
========================================================= */

@media(max-width:900px){
  .gb-vendor-hero{
    grid-template-columns:1fr;
    gap:34px;
  }

  .gb-vendor-preview{
    max-width:700px;
  }

  .gb-vendor-summary{
    max-width:700px;
  }

  .gb-vendor-actions{
    max-width:420px;
  }
}

@media(max-width:700px){
  .gb-tool{
    margin-top:68px;
    padding-top:38px!important;
  }

  .gb-preview-app{
    grid-template-columns:52px 1fr;
    min-height:300px;
  }

  .gb-preview-nav{
    padding-inline:10px;
  }

  .gb-preview-main{
    padding:16px;
  }

  .gb-preview-kpis{
    grid-template-columns:repeat(3,1fr);
  }

  .gb-preview-dashboard{
    grid-template-columns:1fr;
  }

  .gb-preview-sidecard{
    display:none;
  }

  .gb-feature-grid,
  .gb-balance{
    grid-template-columns:1fr;
  }

  .gb-feature-card:last-child:nth-child(odd){
    grid-column:auto;
  }

  .gb-feature-card{
    grid-template-columns:44px 1fr;
    gap:14px;
    padding:20px;
  }

  .gb-feature-number{
    width:40px;
    height:40px;
    font-size:12px;
  }

  .gb-balance-card{
    padding:24px 22px;
  }

  .gb-review{
    grid-template-columns:1fr;
  }

  .gb-review-mark{
    min-height:100px;
  }

  .gb-price{
    grid-template-columns:42px 1fr;
  }

  .gb-price h3{
    align-self:center;
  }

  .gb-article .gb-price p{
    grid-column:1/-1;
    padding:15px 0 0;
    border-left:0;
    border-top:1px solid #e3e8e5;
  }

  .gb-section-side{
    display:none;
  }
}

@media(max-width:520px){
  .gb-vendor-hero{
    gap:30px;
    margin-bottom:38px;
  }

  .gb-preview-window{
    border-radius:13px;
  }

  .gb-preview-browser{
    height:31px;
  }

  .gb-preview-app{
    grid-template-columns:44px 1fr;
    min-height:255px;
  }

  .gb-preview-nav{
    gap:12px;
    padding:13px 8px;
  }

  .gb-preview-nav b{
    width:25px;
    height:25px;
  }

  .gb-preview-nav span{
    width:20px;
  }

  .gb-preview-main{
    padding:13px;
  }

  .gb-preview-kpis>div{
    padding:9px;
  }

  .gb-preview-kpis strong{
    font-size:14px;
  }

  .gb-preview-footer{
    display:none;
  }

  .gb-preview-label{
    display:none;
  }

  .gb-tool-heading h2{
    font-size:38px;
  }

  .gb-vendor-actions{
    grid-template-columns:1fr;
  }

  .gb-vendor-intro{
    margin:36px 0 44px;
  }

  .gb-article .gb-vendor-intro p{
    font-size:15px;
  }

  .gb-feature-card{
    min-height:0;
  }

  .gb-balance-card{
    padding:22px 18px;
  }

  .gb-balance-heading h3{
    font-size:18px;
  }

  .gb-review{
    padding:22px;
  }

  
}

@media(prefers-reduced-motion:reduce){.gb-page *{scroll-behavior:auto!important}}
@media print{.gb-toc,.gb-mobile-toc,.gb-progress,.gb-cta,.gb-footer,.gb-copy-button{display:none}.gb-layout{display:block}.gb-wrap{width:100%}.gb-hero{padding:15px 0}.gb-hero h1{font-size:34px}.gb-table{min-width:0}.gb-balance,.gb-review,.gb-verdict{break-inside:avoid}.gb-tool{break-before:page}.gb-page{font-size:12px}.gb-article h2{font-size:27px}}
`;