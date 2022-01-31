import { faker } from '@faker-js/faker';
import format from 'date-fns/format';

const email = faker.internet.email(); 
const password = 'aA1!' + faker.internet.password();

const referral = [
  'An association website or career website',
  'A recruiter called me',
  'A recruiter contacted me on Indeed',
  'A recruiter contacted me on LinkedIn',
  'Big Shoes',
  'Career Builder',
  'Glassdoor',
  'HandShake',
  'I know someone at ThedaCare',
  'I met a ThedaCare employee at a job fair',
  'I met a ThedaCare employee at my school',
  'I saw it on Facebook',
  'I saw it on Indeed',
  'I saw it on Instagram',
  'I saw it on LinkedIn',
  'I was contacted by text message',
  'I was represented by a headhunter or agency recruiter',
  'Monster',
  'Purple Briefcase',
  'Simply Hired',
  'TechConnect',
  'ThedaCare sent me an email',
  'ThedaCare website',
  'Twitter',
  'Zip Recruiter'
];

const phoneNumbers = [
  '(706) 200-6640',
  '(346) 260-8913',
  '(904) 616-9775',
  '(421) 241-3687',
  '(533) 650-0806',
  '(758) 406-8255',
  '(598) 468-8314',
  '(955) 631-0635',
  '(705) 521-8359',
  '(968) 836-3439',
  '(948) 423-2716',
  '(604) 236-6804',
  '(646) 824-0055',
  '(403) 831-8944',
  '(942) 934-4890',
  '(439) 599-9072',
  '(884) 755-8693',
  '(268) 842-7826',
  '(437) 977-3913',
  '(701) 271-7784',
  '(368) 446-2631',
  '(401) 312-6594',
  '(275) 278-7634',
  '(781) 994-7938',
  '(615) 405-8777',
  '(519) 678-2805',
  '(913) 529-0441',
  '(573) 392-1485',
  '(830) 812-7577',
  '(727) 672-2610',
  '(828) 376-5327',
  '(520) 496-6734',
  '(272) 426-3980',
  '(424) 577-8631',
  '(986) 456-7318',
  '(877) 428-2557',
  '(950) 422-4584',
]

const prevWorker = [
  'Yes',
  'No'
]

const college = [
  'Northern State University',
  'Presentation College',
  'Abilene Christian University',
  'Hardin-Simmons University',
  'McMurry University',
  'Ohio Northern University',
  'East Central University',
  'Chamberlain University',
  'Adrian College',
  'Siena Heights University',
  'University of South Carolina-Aiken',
  'University of Akron',
  'Adams State University',
  'University at Albany, State University of New York',
  'The College of Saint Rose',
  'Albany Medical College',
  'Albany State University',
  'Albany Law School',
  'Albany College of Pharmacy and Health Sciences',
  'Maria College',
  'Albion College',
]

const degree = [
  'A.A.',
  'A.D.N.',
  'B.A.',
  'B.S.',
  'B.S.N.',
  'CERT.',
  'DCS',
  'DPT',
  'GED',
  'HS',
  'M.A.',
  'M.S.',
  'MBA',
  'PhD',
]

const salary = [
  '50000',
  '60000',
  '70000',
  '80000',
  '90000',
  '100000',
  '120000',
  '150000',
]

const gender = [
  'Female',
  'Male',
]

const hispanic = [
  'Yes',
  'No'
]

const race = [
  'American Indian or Alaska Native (Not Hispanic or Latino) (United States of America)',
  'Asian (Not Hispanic or Latino) (United States of America)',
  'Black or African American (Not Hispanic or Latino) (United States of America)',
  'Hispanic or Latino (United States of America)',
  'Native Hawaiian or Other Pacific Islander (Not Hispanic or Latino) (United States of America)',
  'Two or More Races (Not Hispanic or Latino) (United States of America)',
  'White (Not Hispanic or Latino) (United States of America)',
]

describe('bot', () => {
  it('bot', () => {
    cy.viewport(1000, 3000);
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit('https://careers.thedacare.org/us/en/apply?jobSeqNo=THEDUS2108481EXTERNALENUS');
    cy.reload(true);

    cy.get('input[type="file"]').attachFile('resume.pdf');
    cy.findByLabelText(/Country/i).select('United States of America', { force: true });
    cy.findByLabelText(/First Name/i).clear().type(faker.name.firstName(), { force: true });
    cy.findByLabelText(/Last Name/i).clear().type(faker.name.lastName(), { force: true });
    cy.findByLabelText(/Address Line 1/i).clear().type(faker.address.streetAddress(), { force: true });
    cy.findByLabelText(/City/i).clear().type(faker.address.city(), { force: true });
    cy.findByLabelText(/Postal Code/i).clear().type(faker.address.zipCode(), { force: true });
    cy.findByLabelText(/Email address/i).clear().type(email, { force: true });
    cy.get('#phoneWidget\\.phoneNumber').clear().type(faker.helpers.randomize(phoneNumbers), { force: true });
    cy.findByLabelText(/How did you hear about us/i).select(faker.helpers.randomize(referral), { force: true });
    cy.findByLabelText(/Are you a previous worker of ThedaCare/i).select(faker.helpers.randomize(prevWorker), { force: true });
    cy.wait(1000);
    cy.get('#next').click({ force: true });

    cy.findByLabelText(/Job title/i, { timeout: 20000 }).clear().type(faker.name.jobTitle(), { force: true });
    cy.findByLabelText(/Company/i).clear().type(faker.company.companyName(), { force: true });
    cy.get('#experienceData\\[0\\]\\.fromTo\\.startDate').click()
    cy.get('select[class="range-select"]').select(format(faker.date.past(5), 'yyyy'), { force: true })
    cy.contains(format(faker.date.past(3), 'MMM')).click();
    cy.get('#experienceData\\[0\\]\\.fromTo\\.endDate').click()
    cy.get('select[class="range-select"]').select(format(faker.date.past(1), 'yyyy'), { force: true })
    cy.contains(format(faker.date.past(1), 'MMM')).click();
    cy.findByLabelText(/School or University/i).clear().type(faker.helpers.randomize(college), { force: true });
    cy.findByLabelText(/Degree/i).select(faker.helpers.randomize(degree), { force: true });
    cy.findByLabelText(/Field of study/i).select('Law', { force: true });
    cy.get('#next').click({ force: true });

    cy.findByLabelText(/Are you at least 18 years of age/i, { timeout: 20000 }).select('Yes', { force: true });
    cy.findByLabelText(/Are you legally authorized to work in the United States/i).select('Yes', { force: true });
    cy.findByLabelText(/Date available to start work/i).clear().type(format(faker.date.future(1), 'yyyy-MM-dd'), { force: true }); 
    cy.findByLabelText(/Do you now, or will you in the future, require sponsorship for employment authorization/i).select('Yes', { force: true })
    cy.findByLabelText(/What are your minimum salary requirements/i).clear().type(faker.helpers.randomize(salary), { force: true }); 
    cy.findByLabelText(/Other name/i).clear().type('N/A', { force: true }); 
    cy.findAllByLabelText(/Have you resided outside the state of Wisconsin in the last 3 years/i).select('No', { force: true });
    cy.findByLabelText(/Full-Time/i).check({ force: true });
    cy.get('#next').click({ force: true });

    cy.get('#gender', { timeout: 20000 }).select(faker.helpers.randomize(gender), { force: true });
    cy.findByLabelText(/Are you Hispanic or Latino/i).select(faker.helpers.randomize(hispanic), { force: true });
    cy.findByLabelText(/If not Hispanic or Latino, please select one of the following race categories/i).select(faker.helpers.randomize(race), { force: true });
    cy.findAllByLabelText(/We are a Government contractor/).select('I am not a veteran', { force: true });
    cy.findByLabelText(/Yes, I have read and consent to the terms and conditions./i).check({ force: true });
    cy.get('#next').click({ force: true });

    cy.findByLabelText(/Language/i, { timeout: 20000 }).select('English', { force: true });
    cy.findAllByLabelText(/No, I Don\'t Have A Disability, Or A History\/Record Of Having A Disability/i).check({ force: true })
    cy.get('#next').click({ force: true });
    cy.contains('Submit').click({ force: true });

    cy.contains(/Create your WorkDay Account/i, { timeout: 20000 }).click({ force: true });

    cy.contains(/Create Account/i, { timeout: 20000 });
    cy.findByLabelText(/Email Address/i).clear().type(email, { force: true });
    cy.findByLabelText(/^Password/i).clear().type(password, { force: true });
    cy.findByLabelText(/Verify New Password/i).clear().type(password, { force: true });
    cy.get('button[data-automation-id="createAccountSubmitButton"]').click({ force: true });    

    cy.contains(/Sign In/i, { timeout: 20000 });
    cy.findByLabelText(/Email Address/i).clear().type(email, { force: true });
    cy.findByLabelText(/^Password/i).clear().type(password, { force: true });
    cy.get('button[data-automation-id="createAccountSubmitButton"]').click({ force: true });    
  })
})