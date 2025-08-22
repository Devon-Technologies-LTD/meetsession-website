import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DotIcon } from "lucide-react";
import Link from "next/link";

export function PolicyContainer() {
  return (
    <div className="text-white w-full h-full min-h-fit py-20 px-28 flex flex-col gap-7">
      <section className="flex flex-col gap-4 font-raleway">
        <p className="font-bold text-3xl">Legal Center</p>
        <div className="text-base font-light flex items-center">
          <span>Privacy Policy</span>
          <DotIcon />
          <span>Terms of Service</span>
          <DotIcon />
          <span>Cookie Policy</span>
          <p className="pl-1 flex items-center gap-3">
            <span>- Last Update:</span>
            <span className="font-bold">August 20th, 2025</span>
          </p>
        </div>
      </section>

      <section className="min-h-fit w-full flex flex-col gap-8">
        <div>
          <Button
            variant="brand-green"
          >
            Privacy Policy
          </Button>
        </div>

        <div className="flex items-start gap-20 min-h-fit">
          <aside className={cn(
            "border-2 border-brand-green-dark rounded-xl overflow-y-auto",
            "py-5 px-6 min-h-fit h-fit w-72 font-raleway",
            "flex flex-col gap-4",
            "sticky top-24",
          )}>
            <p className="font-bold uppercase">INTRODUCTION</p>
            {headers.map((item) => (
              <Link href={item.href} className="flex flex-col gap-2" key={item.href}>
                <p className="font-medium">{item.name}</p>
                <span className="border-b border-dashed border-neutral-600" />
              </Link>
            ))}
          </aside>

          <main className="flex-1 flex flex-col gap-2 font-dm-sans">
            <p className="font-semibold text-lg">Privacy Policy</p>

            <div className="flex flex-col w-full gap-3.5 text-sm">
              <div className="flex flex-col gap-2.5">
                <p className="text-lg font-semibold">Introduction</p>
                <p className="">
                  Devon Technologies Ltd is a technology company incorporated to provide innovative technology solutions and artificially intelligent options to discovered challenges.
                  Clients and users can access our services through these channels including our website https://www.devontech.io/
                  This document details the policies of the Company guiding the collection, use, storage, transmission, destruction and disclosure of personally identifiable information.
                </p>
              </div>

              <div className="flex flex-col gap-2.5" id="scope-and-applicability">
                <p className="text-lg font-semibold">SCOPE AND APPLICABILITY</p>
                <p className="">
                  Scope & Applicability: This Privacy Policy applies to all individuals and entities whose personal data is processed by Devon Technologies, including but not limited to customers, users of our software and services, employees, contractors, vendors, and visitors to our physical and online platforms.
                </p>
              </div>

              <div className="flex flex-col gap-2.5" id="commitment">
                <p className="text-lg font-semibold">COMMITMENT</p>
                <p className="">
                  This policy document is available on our website https://www.devontech.io/ with physical copies at our office.
                  By subscribing to our service or installing our Software, you consent to the processing of your personal data in accordance with this policy.
                  Unless otherwise defined in this Privacy Policy, terms used in this Privacy Policy have the same meanings as in our Terms and Conditions on https://www.devontech.io/
                  Please review this privacy policy carefully, as it will assist you in making informed decisions about sharing your personal information with us.
                </p>
              </div>

              <div className="flex flex-col gap-2.5" id="definitions">
                <p className="text-lg font-semibold" id="lawful-bases-defined">2. Definitions </p>
                <p className="">
                  <strong>&ldquo;Consent&rdquo;</strong> of the Data Subject means any freely given, specific, informed, and unambiguous expression of the Data Subject&apos;s wishes, where they, through a statement or clear affirmative action, demonstrate consent to the processing of their personal data
                  <br />
                  <strong>&ldquo;Controller&rdquo;</strong> The entity that determines the purposes and means of processing personal data.
                  <br />
                  <strong>&ldquo;Data&rdquo;</strong> means characters, symbols, and binary data on which a computer performs operations. This data may be stored or transmitted as electronic signals, and can be saved in any format or on any device.
                  <br />
                  &ldquo;Data Subject&rdquo; means any individual who can be identified, either directly or indirectly, through an identification number or one or more attributes related to their physical, physiological, mental, economic, cultural, or social identity.
                  <br />
                  <strong>&ldquo;NDPR&rdquo;</strong> means the Nigeria Data Protection Regulation, 2019.
                  <br />
                  <strong>&ldquo;NDPA&rdquo;</strong> means the Nigeria Data Protection Act, 2023.
                  <br />
                  &ldquo;Our Services or Software&rdquo; means all software developed by Devon Technologies Limited
                  <br />
                  &ldquo;Personal Data&rdquo; means any information relating to an identified or identifiable natural person (‘Data Subject’); an identifiable natural person is one who can be identified, directly or indirectly, in particular by reference to an identifier such as a name, , location data, an online identifier, an identification number or to one or more factors specific to the physical, physiological, genetic, mental, economic, cultural or social identity of that natural person; It can be anything from a name, address, a photo, an email address, financial details, posts on social networking
                  websites, medical information, and other unique identifier such as but not limited to MAC address, IP address, IMEI number, IMSI number, SIM, Personal Identifiable Information (PII) and others.
                  <br />
                  <strong>&ldquo;Personal Identifiable Information (PII)&rdquo;</strong> means information that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in a context.
                  <br />
                  <strong>&ldquo;Processing&rdquo;</strong> means any operation or series of operations performed on Personal Data or sets of Personal Data, whether or not by automated means, including activities such as collection, recording, organization, structuring, storage, modification, retrieval, consultation, use, disclosure through transmission, dissemination, or any other means of making available, as well as alignment, combination, restriction, erasure, or destruction.
                  <br />
                  <strong>&ldquo;Special Category Data&rdquo;</strong> (Sensitive Personal Data) means personal data revealing racial or ethnic origin, political opinions, religious or philosophical beliefs, trade union membership, genetic data, biometric data for the purpose of uniquely identifying a natural person, data concerning health, or data concerning a natural person’s sex life or sexual orientation. Processing of such data requires explicit consent and additional safeguards under applicable law.
                  <br />
                  <strong>&ldquo;Data protection Officer&rdquo;</strong> Data Protection Officer (DPO) means the individual appointed by Devon Technologies responsible for overseeing data protection strategy, ensuring compliance with data protection laws, and acting as the contact point for data subjects and supervisory authorities.
                </p>
              </div>

              <div className="flex flex-col gap-2.5" id="information-collection-and-use">
                <p className="text-lg font-semibold">3. Information Collection and Use </p>
                <p className="">
                  We want you to know that we collect personal information actively and passively. This means that when you use our Software, we sometimes require you to provide personally identifiable information when you want to take specific actions like registering for our services or onboarding on the platform we have created. In addition, when using our Sites and Services, our Sites and Services passively collect personally identifiable information as necessary to ensure the Sites and Services are operating effectively for our users
                </p>
              </div>

              <div className="flex flex-col gap-2.5">
                <p className="text-lg font-semibold">Types of Data Collected</p>
                <p className="text-lg font-semibold">Personal Data</p>

                <p className="">
                  We want you to know that we collect personal information actively and passively. This means that when you use our Software, we sometimes require you to provide personally identifiable information when you want to take specific actions like registering for our services or onboarding on the platform we have created. In addition, when using our Sites and Services, our Sites and Services passively collect personally identifiable information as necessary to ensure the Sites and Services are operating effectively for our users

                  While using our Service or Software, you may be asked to provide us with certain personally identifiable information that can be used to contact or identify you (&ldquo;Personal Data&rdquo;). Personally, identifiable information may include, but is not limited to:
                </p>
              </div>

              <div className="flex flex-col gap-2.5">
                <p className="text-lg font-semibold">Name and Contact Data:</p>
                <p className="">
                  collect your first, middle and last name, email address, signature, date of birth, an identification document such as a copy of driver’s license, international passport, national identity card, and other similar contact data.
                </p>
              </div>

              <div className="flex flex-col gap-2.5">
                <p className="text-lg font-semibold">Usage Data:</p>
                <p className="">
                  We may also collect information that your browser sends or computer on which the Software is installed whenever you access our services (&ldquo;Usage Data&rdquo;).
                  This Usage Data may include information such as your computer&apos;s Internet Protocol address (e.g., IP address), browser type, browser version, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.
                </p>
              </div>

              <div className="flex flex-col gap-2.5">
                <p className="text-lg font-semibold">Usage Data may also include the following:</p>
                <p className="text-lg font-semibold">Geo-Location information:</p>
                <p className="">We may request access or permission to and track location-based information from your computer. If you wish to change our access or permissions, you may do so in your device&apos;s settings.</p>
              </div>

              <div className="flex flex-col gap-2.5">
                <p className="text-lg font-semibold">Tracking & Cookies Data:</p>
                <p className="">
                  We use cookies and similar tracking technologies to track the activity on our Service.
                  Cookies are files with small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device. Tracking technologies also used are beacons, tags, and scripts to collect and track information and to improve and analyze our Service.
                  You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
                </p>
              </div>

              <div className="flex flex-col gap-2.5">
                <p className="text-lg font-semibold">Sensitive Personal Data</p>
                <p className="">
                  While using our services, we may ask you to provide us with certain sensitive personal data such as Sex (Male/Female), Nationality and Religion, state of origin, date of birth as required by our regulator.
                </p>
              </div>

              {/* table */}
              <div className="bg-white p-5 rounded-2xl">
                <table className="text-brand-black-dark">
                  <thead>
                    <tr>
                      {tableHeaders1.map(item => (
                        <th className="border border-black py-2.5 px-2 first:rounded-tl-xl last:rounded-tr-xl rounded-4xl" key={item}>{item}</th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {tableRows1.map(row => (
                      <tr key={row.id}>
                        {row.data.map(item => (
                          <td key={item} className="border border-black py-3.5 px-5">{item}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col gap-2.5">
                <p className="text-lg font-semibold">Use of Analytics to Collect/Monitor/Analyze Data </p>
                <p className="">
                  <p>We may use third-party Service Providers to monitor and analyze the use of our Service. We may use analytics services to help us understand how our services are used, improve functionality, and enhance user experience</p>
                  <p>Links to Other Sites</p>
                  <p>
                    Our Service may contain links to other sites that are not operated by us. If you click on a third-party link, you will be directed to that third party&apos;s site. We strongly advise you to review the Privacy Policy of every site you visit.
                    We have no control over and assume no responsibility for the content, privacy policies or practices of any third-party sites or services.
                  </p>
                </p>
              </div>

              <div className="flex flex-col gap-2.5">
                <p className="text-lg font-semibold">User control and Opt-out</p>
                <p className="text-lg font-semibold">User Control and Opt-Out:</p>
                <p className="">
                  You have the right to opt out of non-essential analytics tracking at any time. This can be done through our cookie banner, in-app settings, or by adjusting your browser settings to reject tracking cookies. For Google Analytics, you can install the opt-out browser add-on here: https://tools.google.com/dlpage/gaoptout
                </p>
              </div>

              <div className="flex flex-col gap-2.5">
                <p className="text-lg font-semibold">Data minimization</p>
                <p className="text-lg font-semibold">Data Minimization and Anonymization:</p>
                <p className="">
                  Where possible, analytics data is aggregated and anonymized so that it cannot reasonably be used to identify any specific individual. IP addresses may be truncated or masked before storage.
                </p>
              </div>

              <div className="flex flex-col gap-2.5">
                <p className="text-lg font-semibold">Use of Data</p>
                <p className="">
                  <p>We use the personal data we collect for the following purposes, in line with NDPR, NDPA, and, where applicable, GDPR requirements.</p>
                  <p>Service Provision</p>
                  <p>
                    • To register you as a user, verify your identity, and create/manage your account.
                    <br />
                    • To deliver and maintain our software and services.
                    <br />
                    • To enable you to access core features, including secure login, case/file management, and customer support.
                    <br />
                  </p>
                </p>
              </div>

              <div className="flex flex-col gap-2.5">
                <p className="text-lg font-semibold">Lawful Basis:</p>
                <p className=""> Contract performance, Legitimate Interest (maintaining service availability)</p>
                <p className="text-lg font-semibold">User Control:</p>
                <p className="">Account closure or service termination will stop this processing, except where retention is required by law.</p>
              </div>

              <div className="flex flex-col gap-2.5">
                <p className="text-lg font-semibold">Service Improvement</p>
                <p className="">
                  • To monitor usage patterns and service performance.
                  <br />
                  • To troubleshoot issues and develop new features.
                  <br />
                  • To conduct analytics for product enhancement (see &ldquo;Use of Analytics&rdquo; section).
                  <br />
                </p>
              </div>

              <div className="flex flex-col gap-2.5">
                <p className="text-lg font-semibold">Lawful Basis:</p>
                <p className="">Legitimate Interest</p>

                <p className="text-lg font-semibold">User Control:</p>
                <p className="">You may opt out of non-essential analytics via our cookie banner or in-app settings.</p>
                <p>Compliance and Legal Obligations</p>
                <p>
                  • To comply with legal, regulatory, and contractual obligations.
                  <br />
                  • To respond to lawful requests from public authorities, regulators, or law enforcement.
                  <br />
                </p>

                <p className="text-lg font-semibold">Lawful Basis:</p>
                <p>Legal Obligation</p>

                <p className="text-lg font-semibold">User Control:</p>
                <p>Processing cannot be refused where legally required.</p>
                <p>Security and Fraud Prevention</p>
                <p>
                  • To detect, prevent, and respond to fraud, security breaches, and unauthorized access.
                  <br />
                  • To enforce our Terms of Service and protect our rights and interests.
                  <br />
                </p>

                <p className="text-lg font-semibold">Lawful Basis:</p>
                <p>Legitimate Interest, Legal Obligation</p>

                <p className="text-lg font-semibold">User Control:</p>
                <p>Limited — essential for the safety and integrity of our services.</p>
              </div>

              <div className="flex flex-col gap-2.5">
                <p className="text-lg font-semibold">Marketing and Communications</p>
                <p className="">
                  • To send you promotional content, product updates, and offers.
                  <br />
                  • To deliver targeted advertising relevant to your interests.
                  <br />
                </p>

                <p className="text-lg font-semibold">Lawful Basis:</p>
                <p>Consent (for electronic marketing), Legitimate Interest (for service-related communications)</p>

                <p className="text-lg font-semibold">User Control:</p>
                <p>You may withdraw consent or opt out of marketing at any time via unsubscribe links, in-app settings, or by contacting us.</p>

                <p>Basis for Lawful Processing</p>
                <p>
                  Devon Technologies processes data in accordance with the Nigeria Data Protection Regulation 2019 and the Nigeria Data Protection Act, 2023. The Company relies on the basis for lawful processing stated below.
                  The data subject has given and not withdrawn his consent for the specific purpose or purposes for which it will be processed;
                </p>

                <p>The processing is necessary;</p>
                <p>
                  a. For the performance of a contract to which the data subject is party or in order to take steps at the request of the data subject prior to entering into a contract,
                  b. For compliance with a legal obligation to which the data controller or data processor is subject in order to protect the vital interest of the data subject or another individual,
                  c. For the performance of a task carried out in the public interest or in the exercise of official authority vested in the data controller or data processor.
                </p>
              </div>


              <div className="flex flex-col gap-2.5">
                <p className="text-lg font-semibold">Lawful Bases Defined</p>

                <p className="text-lg font-semibold">Consent:</p>
                <p>You have given clear permission for us to process your personal data for a specific purpose.</p>

                <p className="text-lg font-semibold">Contract:</p>
                <p>Processing is necessary for a contract you have with us, or because you have asked us to take specific steps before entering into a contract.</p>

                <p className="text-lg font-semibold">Legal Obligation:</p>
                <p>Processing is necessary to comply with a law (not including contractual obligations).</p>

                <p className="text-lg font-semibold">Vital Interests:</p>
                <p>Processing is necessary to protect someone’s life.</p>

                <p className="text-lg font-semibold">Public Interest/Official Authority:</p>
                <p>Processing is necessary for us to perform a task in the public interest or for official functions.</p>

                <p className="text-lg font-semibold">Legitimate Interests:</p>
                <p>Processing is necessary for our legitimate interests or the legitimate interests of a third party, unless there is a good reason to protect your personal data that overrides those interests.</p>
              </div>


              <div className="flex flex-col gap-2.5">
                <p className="text-lg font-semibold">Lawful Basis Mapping Table</p>
              </div>

              {/* table */}
              <div className="bg-white p-5 rounded-2xl">
                <table className="text-brand-black-dark">
                  <thead>
                    <tr>
                      {tableHeaders2.map(item => (
                        <th className="border border-black py-2.5 px-2 first:rounded-tl-xl last:rounded-tr-xl rounded-4xl" key={item}>{item}</th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {tableRows2.map(row => (
                      <tr key={row.id}>
                        {row.data.map(item => (
                          <td key={item} className="border border-black py-3.5 px-5">{item}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col gap-2.5" id="transfer-of-data">
                <p className="text-lg font-semibold">Transfer of Data</p>
                <p>
                  The world today is interconnected and so is the provision of the Services, in the event that Devon has contractual relations with third party for the purpose of providing the Data Subject with effective Service or maintenance services, Certain personal data will traverse these parties in the normal course of carrying out transactions.
                  <br />
                  Save as related to the provision of Companying services and meeting legal, regulatory, contractual, and other uses tangential or incidental to these, Devon will not share your personal data with a third party. Where it becomes necessary to do so, adequate security measures will be taken to protect the data from access by recipients other than those for which it is intended. All data we collect will reside in Devon’s computer systems in Nigeria. Where cloud services are used, adequate governance measures that apply to such cloud services will be complied with.
                  <br />
                  Devon will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy. No transfer of your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of your data and other personal information.
                  <br />
                  <br />
                  Transfer of Personal Data to a Foreign Country
                  <br />
                  Where Personal Data is to be transferred to a country outside Nigeria, the Company shall put adequate measures in place to ensure the security of such Personal Data. In particular, the Company shall, among other things, conduct a detailed assessment of whether the said country is on the National Information Technology Development Agency’s (NITDA’s) Whitelist of Countries with adequate data protection laws.
                  <br />
                  Transfer of Personal Data out of Nigeria would be in accordance with the provisions of the Nigeria Data Protection Regulation, 2019 (NDPR) and the Nigeria Data Protection Act, 2023 (NDPA). The Company will therefore only transfer Personal Data out of Nigeria or process data on one of the following conditions:
                  <br />
                  <br />
                  a. The consent of the Data Subject has been obtained;
                  <br />
                  b. It is necessary for the performance of a contract between the Company and the Data Subject or implementation of pre-contractual measures taken at the Data Subject’s request;
                  <br />
                  c. It is necessary to conclude a contract between the Company and a third party in the interest of the Data Subject;
                  <br />
                  d. It is necessary for reason of public interest;
                  <br />
                  e. It is for the establishment, exercise or defense of legal claims;
                  <br />
                  f. It is necessary in order to protect the vital interests of the Data Subjects or other persons, where the Data Subject is physically or legally incapable of giving consent.
                  <br />
                  g. It is necessary for the purposes of the legitimate interests pursued by the Company or by a third party to whom the data is disclosed.
                  <br />
                  <br />

                  Provided, in all circumstances, that the Data Subject has been manifestly made to understand through clear warnings of the specific principle(s) of data protection that are likely to be violated in the event of transfer to a third country, this provision shall not apply to any instance where the Data Subject is answerable in duly established legal action for any civil or criminal claim in a third country.
                  <br />
                  The Company will take all necessary steps to ensure that the Personal Data is transmitted in a safe and secure manner. Details of the protection given to your information when it is transferred outside Nigeria shall be provided upon the Data Subject’s request.
                  <br />
                  Where the recipient country is not on the Whitelist and none of the conditions stipulated in this Privacy Policy are met, the Company will engage with Nigeria Data Protection Commission and the Office of the Honorable Attorney General of the Federation (HAGF) for approval with respect to such transfer.
                  <br />
                </p>
              </div>


              <div className="flex flex-col gap-2.5" id="disclosure-of-data">
                <p className="text-lg font-semibold">Disclosure of Data</p>
                <p>
                  We only share and disclose your information in the following situations:
                  <br />
                  <br />
                  a. <strong>Performance of Contractual Obligations:</strong> We may disclose your data to perform and conclude a contract in the interest of the Data Subject. The interest of the Data Subject includes but is not limited to provision of financial services.
                  <br />
                  b. <strong>Compliance with Laws:</strong> We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process, such as in response to a court order or a subpoena (including in response to public authorities to meet national security or law enforcement requirements).
                  <br />
                  c. <strong>Vital interests and Legal Rights:</strong> We may disclose your information where we believe it is necessary to investigate, prevent, or take action regarding potential violations of our policies, suspected fraud, situations involving potential threats to the safety of any person and illegal activities, or as evidence in litigation in which we are involved.
                  <br />
                  d. <strong>Vendors, Consultants and Third-party Service Providers:</strong> We may share your data with third party vendors, service providers, contractors or agents who perform services for us or on our behalf and require access to such information to do that work, which is necessary to provide the envisaged Companying services. Examples include but not limited to: payment processing, data analysis, email delivery, hosting services, customer service and marketing efforts. For the purpose of service improvement, we may allow selected third parties to use tracking technology on the services which will enable them to collect data about how you interact with the services over time. This information may be used to, among other things, analyze and track data, determine the popularity of certain content and better understand online activity. Unless described in this policy, we do not share, sell, rent, or trade any of your information with third parties for their promotional purposes.
                  <br />
                  e. <strong>Business transfers:</strong> we may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.
                  <br />
                  f. With your consent we may disclose your personal information for any other purpose.
                  <br />
                </p>
              </div>

              <div className="flex flex-col gap-2.5" id="security-of-data">
                <p className="text-lg font-semibold">Security of Data</p>
                <p>
                  The security of your personal data is a top priority for Devon Technologies. We have implemented a combination of technical, organizational, and physical safeguards to ensure the confidentiality, integrity, and availability of personal data, in line with NDPR, NDPA, and internationally recognized best practices.
                  <br />
                  The security of your personal data is a top priority for Devon Technologies, and we are committed to implementing technical, organizational, and physical safeguards that ensure its confidentiality, integrity, and availability in line with the NDPR, NDPA, and internationally recognized standards such as ISO 27001 and the NIST Cybersecurity Framework.
                  <br />
                  <br />
                  All personal data we process is encrypted in transit using TLS or higher and at rest using AES-256 or equivalent, with access strictly controlled through role-based permissions, the principle of least privilege. We apply network security measures, including firewalls, intrusion detection and prevention systems, and DDoS mitigation, alongside anonymization or pseudonymization of data where possible.
                  <br />
                  <br />
                  In the event of a breach, our Incident Response Plan ensures immediate containment, investigation, and remediation, with notifications to affected data subjects and the Nigeria Data Protection Commission (NDPC) within 72 hours where legally required, followed by a post-incident review. We review and update our security controls at least annually or whenever there are significant changes to our technology, regulatory obligations, or the threat landscape, ensuring our defences remain resilient against evolving risks.
                  <br />
                  However, please also remember that we cannot guarantee that the internet in itself is 100% secure. Although we will do our best to protect your personal information, but transmission of personal information to and from our services is at your own risk. You should only access the services within a secure environment.
                  More information
                </p>
              </div>

              <div className="flex flex-col gap-2.5">
                <p className="text-lg font-semibold">General Principles for Processing of Personal Data</p>
                <p>
                  The Company is committed to maintaining the principles in the NDPR & NDPA regarding the processing of Personal Data.
                  <br />
                  <br />
                  a. To demonstrate this commitment as well as our aim of creating a positive privacy culture within the Company, the Company adheres to the following basic principles relating to the processing of Personal Data
                  <br />
                  b. Lawfulness, Fairness and Transparency

                  Personal Data must be processed lawfully, fairly and in a transparent manner at all times. This implies that Personal Data collected and processed by or on behalf of the Company must be in accordance with the specific, legitimate and lawful purpose consented to by the Data Subject, save where the processing is otherwise allowed by law or within other legal grounds recognized in the NDPR 2019 and the NDPA 2023.
                  <br />
                  c. Data Accuracy
                  <br />
                  <br />
                  <strong>Personal Data must be accurate and kept up to date. In this regard, the Company shall:</strong>
                  <br />
                  a. ensure that any data it collects and/or processes is accurate and not misleading in a way that could be harmful to the Data Subject.
                  <br />

                  b. make efforts to keep Personal Data updated where reasonable and applicable; and
                  <br />
                  c. make timely efforts to correct or erase Personal Data when inaccuracies are discovered.
                  <br />

                  d. Purpose Limitation

                  The Company collects Personal Data only for the purposes identified in the appropriate Privacy Notice provided to the Data Subject and for which consent has been obtained. Such Personal Data cannot be reused for another purpose that is incompatible with the original purpose, except a new consent is obtained, save where the processing is otherwise allowed by law or within other legal grounds recognized in the NDPR 2019 and the NDPA 2023.
                  <br />
                  e. Data Minimization

                  The Company limits Personal Data collection and usage to data that is relevant, adequate, and necessary for carrying out the purpose for which the data is processed. The Company will evaluate whether and to what extent the processing of personal data is necessary and where the purpose allows, anonymized and/or pseudonymized data must be used.
                  <br />
                  f. Integrity and Confidentiality
                  <br />
                  <br />
                  The Company shall establish adequate controls in order to protect the integrity and confidentiality of Personal Data, both in digital and physical format and to prevent personal data from being accidentally or deliberately compromised.
                  <br />
                  Personal data of Data Subjects must be protected from unauthorized viewing or access and from unauthorized changes to ensure that it is reliable and correct.
                  <br />
                  Any personal data processing undertaken by an employee who has not been authorized to carry such out as part of their legitimate duties is un-authorized.
                  <br />
                  Employees may have access to Personal Data only as is appropriate for the type and scope of the task in question and are forbidden to use Personal Data for their own private or commercial purposes or to disclose them to unauthorized persons, or to make them available in any other way.
                  <br />
                  Human Resources Department must inform employees at the start of the employment relationship about the obligation to maintain personal data privacy. This obligation shall remain in force even after employment has ended.
                  <br />
                  g. Personal Data Retention
                  All personal information shall be retained, stored and destroyed by the Company in line with legislative and regulatory guidelines. For all Personal Data and records obtained, used and stored within the Company, the Company shall perform periodical reviews of the data retained to confirm the accuracy, purpose, validity and requirement to retain.
                  <br />
                  <br />
                  <strong>To the extent permitted by applicable laws and without prejudice to the Company’s Document Retention Policy, the length of storage of Personal Data shall, amongst other things, be determined by:</strong>
                  <br />
                  a. the contract terms agreed between the Company and the Data Subject or as long as it is needed for the purpose for which it was obtained; or
                  <br />

                  b. whether the transaction or relationship has statutory implication or a required retention period; or
                  <br />

                  c. whether there is an express request for deletion of Personal Data by the Data Subject, provided that such request will only be treated where there are no legal or regulatory requirements to keep such data, or the Data Subject is not under any investigation which may require the Company to retain such Personal Data or there is no subsisting contractual arrangement with the Data Subject that would require the processing of the Personal Data; or
                  <br />
                  d. whether the Company has another lawful basis for retaining that information beyond the period for which it is necessary to serve the original purpose.
                  <br />
                  Notwithstanding the foregoing and pursuant to the NDPR 2019 and the NDPA 2023, the Company shall be entitled to retain and process Personal Data for archiving, scientific research, historical research, or statistical purposes for public interest.
                  <br />
                  The Company would forthwith delete Personal Data in the Company’s possession where such Personal Data is no longer required by the Company or in line with the Company’s Retention Policy, provided no law or regulation being in force requires the Company to retain such Personal Data.
                  <br />
                  We will only keep your personal information for as long as it is necessary for the purposes set out in this Privacy Policy unless a longer retention period is required or permitted by law.
                  <br />
                  h. Accountability
                  The Company demonstrates accountability in line with the NDPR and NDPA obligations by monitoring and continuously improving data privacy practices within the Company.
                  Any individual or employee who breaches this Privacy Policy may be subject to internal disciplinary action (up to and including termination of their employment); and may also face civil or criminal liability if their action violates the law.
                  When a potential breach has occurred, the Company will investigate to determine if an actual breach has occurred and take the necessary actions required to manage and investigate the breach. Such actions include:
                  Validating the Personal Data breach.
                  Ensuring proper and impartial investigation (including digital forensics if necessary) is initiated, conducted, documented, and concluded.
                  <br />
                  i. Identifying remediation requirements and tracking resolution.
                  <br />
                  <pre>
                    a. Reporting all findings to the top management.
                    <br />
                    b. Coordinating with appropriate authorities as needed.
                    <br />
                    c. Coordinating internal and external communications.
                    <br />
                    d. Ensuring that impacted Data Subjects are properly notified, if necessary.
                  </pre>
                  <br />
                </p>
              </div>

              <div className="flex flex-col gap-2.5" id="your-privacy-rights">
                <p className="text-lg font-semibold">Your Privacy Rights</p>
                <p>
                  As data subjects you have certain rights under applicable data protection laws such as the NDPR & NDPA for Nigeria and the GDPR for European countries.
                  <br />
                  <br />
                  <strong>These may include the right:</strong>
                  <br />
                  a. to request access and obtain a copy of your personal information.
                  <br />
                  b. to request rectification or erasure.
                  <br />
                  c. to restrict the processing of your personal information and if applicable.
                  <br />
                  d. to data portability.
                  <br />
                  <br />
                  In certain circumstances as stated in section 2.8 of the Nigeria Data Protection Regulation, you may also object to the processing of your personal information. To make such a request, please use the contact details provided below. We will consider and act upon any request in accordance with applicable data protection laws to lodge a complaint with the Nigeria Data Protection Commission
                  <br />
                  If we are relying on your consent to process your personal information, you have the right to withdraw your consent at any time. Please note however, that this will not affect the lawfulness of the processing before its withdrawal.
                  <br />
                  If you are resident in the European Economic Area and you believe we are unlawfully processing your personal information, you also have the right to complain to your local data protection supervisory authority. You can find their contact details here: https://edpb.europa.eu/about- edpb/board/members_en
                  <br />
                </p>
              </div>

              <div className="flex flex-col gap-2.5" id="training">
                <p className="text-lg font-semibold">Training</p>
                <p>
                  The Company shall ensure that employees who collect, access and process Personal Data receive adequate data privacy and protection training in order to develop the necessary knowledge, skills and competence required to effectively manage the compliance framework under this Privacy Policy, the NDPR and the Nigeria Data Protection Act (2023) with regard to the protection of Personal Data. On an annual basis, the Company shall develop a capacity building plan for its employees on data privacy and protection in line with the NDPR and the Nigeria Data Protection Act (2023)
                </p>
              </div>

              <div className="flex flex-col gap-2.5" id="changes-to-this-policy">
                <p className="text-lg font-semibold">Changes to This Privacy Policy</p>
                <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and making it available at our branches. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective as of the date it is made public</p>
              </div>

              <div className="flex flex-col gap-2.5" id="contact-us">
                <p className="text-lg font-semibold">Contact Us</p>
                <p>If you have any further questions or comments about us or our policies, email us at info@devontech.io/ or by post to:</p>
                <br />
                <p className="border-t border-b py-4 w-[50%] italic">
                  <p>Devon Technologies Ltd</p>
                  <p>Mercy Samuelson Estate, Block L</p>
                  <p>House No 2 Plot 622</p>
                  <p>Karmo District, Abuja</p>
                  <p>Federal Capital Territory</p>
                </p>
              </div>

              <div className="italic">
                <p>If you have any inquiries or grievances about this policy, or how Devon Technologies (or any of the Company’s third parties) handles or have handled your personal data, or how your complaint has been handled send an email to info@devontech.io or physically visit the address below: </p>
                <p>Devon Technologies Ltd</p>
                <p>Mercy Samuelson Estate, Block L</p>
                <p>House No 2 Plot 622</p>
                <p>Karmo District, Abuja</p>
                <p>Federal Capital Territory</p>
              </div>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
}

const headers = [
  { name: "SCOPE AND APPLICABILITY", href: "#scope-and-applicability" },
  { name: "COMMITMENT", href: "#commitment" },
  { name: "Definitions", href: "#definitions" },
  { name: "Information Collection and Use", href: "#information-collection-and-use" },
  { name: "Lawful Bases Defined", href: "#lawful-bases-defined" },
  { name: "Transfer of Data", href: "#transfer-of-data" },
  { name: "Disclosure of Data", href: "#disclosure-of-data" },
  { name: "Security of Data", href: "#security-of-data" },
  { name: "Your Privacy Rights", href: "#your-privacy-rights", },
  { name: "Training", href: "#training" },
  { name: "Changes to this policy", href: "#changes-to-this-policy" },
  { name: "Contact Us", href: "#contact-us" },
  // "SCOPE AND APPLICABILITY", "COMMITMENT", "Definitions", "Information collection and use",
  // "Lawful Bases Defined", "Transfer of Data", "Disclosure of Data", "Security of Data",
  // "Your Privacy Rights", "Training", "Changes to this Policy", "Contact Us",
];
const tableHeaders1 = ["Category of Data", "Purpose of Processing", "Lawful Basis", "Recipients"];
const tableRows1 = [
  { id: 1, name: "contact", data: ["Name, contact details, ID documents", "User onboarding, account creation, identity verification", "Consent, contract", "Internal staff, regulators (if required)"] },
  { id: 2, name: "usage", data: ["Usage data (IP address, device info, logs)", "Service delivery, troubleshooting, security monitoring", "Legitimate interest", "Internal IT/security teams"] },
  { id: 3, name: "geolocation", data: ["Geolocation data", "Service personalization, fraud prevention", "Consent, legitimate interest", "Internal service team"] },
  { id: 4, name: "payment", data: ["Payment/billing information", "Processing payments, issuing receipts", "Contract, legal obligation", "Finance department, payment processors"] },
  { id: 5, name: "sensitive", data: ["Sensitive data (e.g. religion, nationality)", "Compliance with regulatory requirements", "Explicit consent, legal obligation", "internal compliance teams, regulators"] },
  { id: 6, name: "cookies", data: ["Cookies/tracking data", "Analytics, marketing, service improvement", "Consent", "Analytics providers, marketing partners"] },
];
const tableHeaders2 = ["Purpose of Processing", "Categories of Data", "Lawful Basis", "Consent Required?"];
const tableRows2 = [
  { id: 1, name: "registration", data: ["Account registration and verification", "Name, contact details, ID documents", "Contract", "No",], },
  { id: 2, name: "service", data: ["Service delivery and feature ccess", "Personal data, usage data", "Contact", "No"] },
  { id: 3, name: "fraud", data: ["Fraud prevention and security monitoring", "Usage data, device info, geo-location", "Legitimate interest, Legal obligation", "No"], },
  { id: 4, name: "reporting", data: ["Regulatory reporting and compliance", "Sensitive personal data, transaction data", "Legal Obligation", "No"], },
  { id: 5, name: "marketing", data: ["Marketing communications", "Contact data, usage data", "Consent", "Yes"], },
  { id: 6, name: "advert", data: ["Targeted advertizing", "Cookies/tracking data, usage data", "Consent", "Yes"], },
  { id: 7, name: "analytics", data: ["Analytics and service improvement", "Usage data, device information", "Legitimate interest (service improvement), Consent (marketing analytics)", "Sometimes"], },
  { id: 8, name: "research", data: ["Research and statistical reporting", "Anonymized/aggregated data", "Legitimate interest, public interest", "No"], },
  { id: 9, name: "emergency", data: ["Emergency life/safety incidents", "Contact and health data (if applicable)", "Vital interests", "No"], },
];
