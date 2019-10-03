import React, { Fragment } from 'react';
import { Text, Box, Link } from '~/components';

const BoldSpan = props => <Text fontWeight="bold" is="span" {...props} />;

const Paragraph = props => <Text mb={20} {...props} />;

const BoldParagraph = props => <Text fontWeight="bold" mb={20} {...props} />;

const ExternalLink = ({ to, children }) => (
    <Link to={to} isExternal target="_blank" rel="noopener noreferrer">
        <Text is="span" color="text.blue">
            {children}
        </Text>
    </Link>
);

const LaguroLink = ({ to, children }) => (
    <Link to={to}>
        <Text is="span" color="text.blue">
            {children}
        </Text>
    </Link>
);

export const Terms = () => (
    <Fragment>
        <BoldParagraph>
            Please read these Terms of Service carefully as they contain
            important information about your legal rights, remedies and
            obligations. By accessing or using the Laguro Platform, you agree to
            comply with and be bound by these Terms of Service.
        </BoldParagraph>
        <BoldParagraph>
            Please note: These Terms of Service contains an arbitration clause
            and class action waiver that applies to all Laguro Users. By
            accepting these Terms of Service, you agree to be bound by this
            arbitration clause and class action waiver. Please read it
            carefully.
        </BoldParagraph>
        <Paragraph>Last Updated: September 30, 2019</Paragraph>
        <Paragraph>Thank you for using Laguro!</Paragraph>

        <Paragraph>
            These Terms of Service (&quot;
            <BoldSpan>Terms</BoldSpan>
            &quot;) constitute a legally binding agreement (&quot;
            <BoldSpan>Agreement</BoldSpan>
            &quot;) between you and Laguro (as defined below) governing your
            access to and use of the Laguro website, including any subdomains
            thereof, and any other websites through which Laguro makes its
            services available (collectively, &quot;
            <BoldSpan>Site</BoldSpan>
            &quot;), our mobile, tablet and other smart device applications, and
            application program interfaces (collectively, &quot;
            <BoldSpan>Application</BoldSpan>
            &quot;) and all associated services (collectively, &quot;
            <BoldSpan>Laguro Services</BoldSpan>
            &quot;). The Site, Application and Laguro Services together are
            hereinafter collectively referred to as the &quot;
            <BoldSpan>Laguro Platform</BoldSpan>
            &quot;.
        </Paragraph>

        <Paragraph>
            When these Terms mention &quot;<BoldSpan>Laguro</BoldSpan>,&quot;
            &quot;<BoldSpan>we</BoldSpan>,&quot; &quot;<BoldSpan>us</BoldSpan>
            ,&quot; or &quot;<BoldSpan>our</BoldSpan>,&quot; it refers to the
            Laguro company you are contracting with.{' '}
        </Paragraph>

        <Paragraph>
            Our collection and use of personal information in connection with
            your access to and use of the Laguro Platform is described in our
            Privacy Policy.
        </Paragraph>

        <Paragraph>
            Dentists alone are responsible for identifying, understanding, and
            complying with all laws, rules and regulations that apply to their
            Dental Services. In many cities, Dentists may have to register, get
            a permit or obtain a license before providing Dental Services.
            Penalties may include fines or other enforcement. If you have
            questions about how local laws apply to Dental Services on Laguro,
            you should always seek legal guidance.
        </Paragraph>

        <BoldParagraph fontSize={2}>1. Scope of Laguro Services</BoldParagraph>
        <Paragraph>
            1.1 The Laguro Platform is a digital and physical platform that
            allows dentists to render dental treatment to the public inside
            Laguro’s clinic. Laguro’s services to dentists may include new
            patient referrals, the offering of clinic space, equipment,
            supplies, staff, or other properties for use. The Laguro Platform
            also allows Patients to create appointments with Dentists for the
            purpose of receiving Dental Services from the selected Dentist.
        </Paragraph>
        <Paragraph>
            1.2 Dentists alone are responsible for their dental treatment.
            Laguro is not and does not become a party to or other participant in
            any contractual relationship between the Dentist and Patient. Laguro
            is not acting as an agent in any capacity for any User.
        </Paragraph>
        <Paragraph>
            1.3 While we may help facilitate the resolution of disputes, Laguro
            has no control over and does not guarantee (i) the existence,
            quality, safety, suitability, or legality of any Dental Services,
            (ii) the truth or accuracy of any descriptions, Ratings, Reviews, or
            other User Content (as defined below), or (iii) the performance or
            conduct of any User or third party. Laguro does not endorse any
            User, Dentist, or Dental Services. Any references to a User being
            &quot;verified&quot; (or similar language) only indicate that the
            User has completed a relevant verification or identification process
            and nothing else. Images are intended only to indicate a
            photographic representation of a User at the time the photograph was
            taken, and are therefore not an endorsement by Laguro.
        </Paragraph>
        <Paragraph>
            1.4 If you choose to use the Laguro Platform as a Dentist, your
            relationship with Laguro is limited to being an independent,
            third-party contractor, and not an employee, agent, joint venturer
            or partner of Laguro for any reason, and you act exclusively on your
            own behalf and for your own benefit, and not on behalf, or for the
            benefit, of Laguro. Laguro does not, and shall not be deemed to,
            direct or control you generally or in your performance under these
            Terms specifically, including in connection with your provision of
            Dental Services. You acknowledge and agree that you have complete
            discretion whether to list Dental Services or otherwise engage in
            rendering such Dental Services through or outside of the Laguro
            Platform.
        </Paragraph>
        <Paragraph>
            1.5 To promote the Laguro Platform and to increase the exposure to
            potential Patients, User Content may be displayed on other websites,
            in applications, within emails, and in online and offline
            advertisements. To assist Users who speak different languages, User
            Content may be translated, in whole or in part, into other
            languages. Laguro cannot guarantee the accuracy or quality of such
            translations and Users are responsible for reviewing and verifying
            the accuracy of such translations.
        </Paragraph>
        <Paragraph>
            1.6 The Laguro Platform may contain links to third-party websites or
            resources (“Third-Party Services”). Such Third-Party Services may be
            subject to different terms and conditions and privacy practices.
            Laguro is not responsible or liable for the availability or accuracy
            of such Third-Party Services, or the content, products, or services
            available from such Third-Party Services. Links to such Third-Party
            Services are not an endorsement by Laguro of such Third-Party
            Services.
        </Paragraph>
        <Paragraph>
            1.7 Due to the nature of the Internet, Laguro cannot guarantee the
            continuous and uninterrupted availability and accessibility of the
            Laguro Platform. Laguro may restrict the availability of the Laguro
            Platform or certain areas or features thereof, if this is necessary
            in view of capacity limits, the security or integrity of our
            servers, or to carry out maintenance measures that ensure the proper
            or improved functioning of the Laguro Platform. Laguro may improve,
            enhance and modify the Laguro Platform and introduce new Laguro
            Services from time to time.
        </Paragraph>

        <BoldParagraph fontSize={2}>
            2. Eligibility, Using the Laguro Platform, User Verification
        </BoldParagraph>
        <Paragraph>
            2.1 You must be at least 18 years old and able to enter into legally
            binding contracts to access and use the Laguro Platform or register
            a Laguro Account. By accessing or using the Laguro Platform you
            represent and warrant that you are 18 or older and have the legal
            capacity and authority to enter into a contract.
        </Paragraph>
        <Paragraph>
            2.2 Laguro may make access to and use of the Laguro Platform, or
            certain areas or features of the Laguro Platform, subject to certain
            conditions or requirements, such as completing a verification
            process, meeting specific quality or eligibility criteria, meeting
            Ratings or Reviews thresholds, or a User’s booking and cancellation
            history.
        </Paragraph>
        <Paragraph>
            2.3 User verification on the Internet is difficult and we do not
            assume any responsibility for the confirmation of any User’s
            identity. Notwithstanding the above, for transparency and fraud
            prevention purposes, and as permitted by applicable laws, we may,
            but have no obligation to (i) ask Users to provide a form of
            government identification or other information or undertake
            additional checks designed to help verify the identities or
            backgrounds of Users, (ii) screen Users against third party
            databases or other sources and request reports from service
            providers, and (iii) where we have sufficient information to
            identify a User, obtain reports from public records of criminal
            convictions or an equivalent version of background check in your
            jurisdiction (if available).
        </Paragraph>
        <Paragraph>
            2.4 The access to or use of certain areas and features of the Laguro
            Platform may be subject to separate policies, standards or
            guidelines, or may require that you accept additional terms and
            conditions. If there is a conflict between these Terms and other
            terms and conditions applicable to a specific area or feature of the
            Laguro Platform, the latter terms and conditions will take
            precedence with respect to your access to or use of that area or
            feature, unless specified otherwise.
        </Paragraph>
        <Paragraph>
            2.5 Some areas of the Laguro Platform implement mapbox.com’s mapping
            services, including mapbox.com’s API(s). Your use of mapbox is
            subject to the{' '}
            <ExternalLink to="https://www.mapbox.com/legal/tos/">
                mapbox.com terms of service
            </ExternalLink>
            .
        </Paragraph>

        <BoldParagraph fontSize={2}>
            3. Modification of these Terms
        </BoldParagraph>
        <Paragraph>
            Laguro reserves the right to modify these Terms at any time in
            accordance with this provision. If we make changes to these Terms,
            we will post the revised Terms on the Laguro Platform and update the
            “Last Updated” date at the top of these Terms. If you disagree with
            the revised Terms, you may terminate this Agreement with immediate
            effect. If you do not terminate your Agreement before the date the
            revised Terms become effective, your continued access to or use of
            the Laguro Platform will constitute acceptance of the revised Terms.
        </Paragraph>

        <BoldParagraph fontSize={2}>4. Account Registration</BoldParagraph>
        <Paragraph>
            4.1 You must register an account (&quot;
            <BoldSpan>Laguro Account</BoldSpan>&quot;) to access and use certain
            features of the Laguro Platform, such as publishing or booking a
            Listing. If you are registering a Laguro Account for a company or
            other legal entity, you represent and warrant that you have the
            authority to legally bind that entity and grant us all permissions
            and licenses provided in these Terms.
        </Paragraph>
        <Paragraph>
            4.2 You can register a Laguro Account using an email address or your
            mobile phone number.
        </Paragraph>
        <Paragraph>
            4.3 You must provide accurate, current and complete information
            during the registration process and keep your Laguro Account and
            public Laguro Account profile page information up-to-date at all
            times.
        </Paragraph>
        <Paragraph>
            4.4 You may not register more than one (1) Laguro Account unless
            Laguro authorizes you to do so. You may not assign or otherwise
            transfer your Laguro Account to another party.
        </Paragraph>
        <Paragraph>
            4.5 You are responsible for maintaining the confidentiality and
            security of your Laguro Account credentials and may not disclose
            your credentials to any third party. You must immediately notify
            Laguro if you know or have any reason to suspect that your
            credentials have been lost, stolen, misappropriated, or otherwise
            compromised or in case of any actual or suspected unauthorized use
            of your Laguro Account. You are liable for any and all activities
            conducted through your Laguro Account, unless such activities are
            not authorized by you and you are not otherwise negligent (such as
            failing to report the unauthorized use or loss of your credentials).
        </Paragraph>

        <BoldParagraph fontSize={2}>5. Content</BoldParagraph>
        <Paragraph>
            5.1 Laguro may, at its sole discretion, enable Users to (i) create,
            upload, post, send, receive and store content, such as text, photos,
            audio, video, or other materials and information on or through the
            Laguro Platform (&quot;<BoldSpan>User Content</BoldSpan>&quot;); and
            (ii) access and view User Content and any content that Laguro itself
            makes available on or through the Laguro Platform, including
            proprietary Laguro content and any content licensed or authorized
            for use by or through Laguro from a third party (&quot;
            <BoldSpan>Laguro Content</BoldSpan>&quot; and together with User
            Content, &quot;<BoldSpan>Collective Content</BoldSpan>&quot;).
        </Paragraph>
        <Paragraph>
            5.2 The Laguro Platform, Laguro Content, and User Content may in its
            entirety or in part be protected by copyright, trademark, and/or
            other laws of the United States and other countries. You acknowledge
            and agree that the Laguro Platform and Laguro Content, including all
            associated intellectual property rights, are the exclusive property
            of Laguro and/or its licensors or authorizing third-parties. You
            will not remove, alter or obscure any copyright, trademark, service
            mark or other proprietary rights notices incorporated in or
            accompanying the Laguro Platform, Laguro Content or User Content.
            All trademarks, service marks, logos, trade names, and any other
            source identifiers of Laguro used on or in connection with the
            Laguro Platform and Laguro Content are trademarks or registered
            trademarks of Laguro in the United States and abroad. Trademarks,
            service marks, logos, trade names and any other proprietary
            designations of third parties used on or in connection with the
            Laguro Platform, Laguro Content, and/or Collective Content are used
            for identification purposes only and may be the property of their
            respective owners.
        </Paragraph>
        <Paragraph>
            5.3 You will not use, copy, adapt, modify, prepare derivative works
            of, distribute, license, sell, transfer, publicly display, publicly
            perform, transmit, broadcast or otherwise exploit the Laguro
            Platform or Collective Content, except to the extent you are the
            legal owner of certain User Content or as expressly permitted in
            these Terms. No licenses or rights are granted to you by implication
            or otherwise under any intellectual property rights owned or
            controlled by Laguro or its licensors, except for the licenses and
            rights expressly granted in these Terms.
        </Paragraph>
        <Paragraph>
            5.4 Subject to your compliance with these Terms, Laguro grants you a
            limited, non-exclusive, non-sublicensable, revocable,
            non-transferable license to (i) download or use the Application on
            your personal device(s); and (ii) access and view any Collective
            Content made available on or through the Laguro Platform and
            accessible to you, solely for your personal and non-commercial use.
        </Paragraph>
        <Paragraph>
            5.5 By creating, uploading, posting, sending, receiving, storing, or
            otherwise making available any User Content on or through the Laguro
            Platform, you grant to Laguro a non-exclusive, worldwide,
            royalty-free, irrevocable, perpetual (or for the term of the
            protection), sub-licensable and transferable license to such User
            Content to access, use, store, copy, modify, prepare derivative
            works of, distribute, publish, transmit, stream, broadcast, and
            otherwise exploit in any manner such User Content to provide and/or
            promote the Laguro Platform, in any media or platform. Unless you
            provide specific consent, Laguro does not claim any ownership rights
            in any User Content and nothing in these Terms will be deemed to
            restrict any rights that you may have to use or exploit your User
            Content.
        </Paragraph>
        <Paragraph>
            5.6 You are solely responsible for all User Content that you make
            available on or through the Laguro Platform. Accordingly, you
            represent and warrant that: (i) you either are the sole and
            exclusive owner of all User Content that you make available on or
            through the Laguro Platform or you have all rights, licenses,
            consents and releases that are necessary to grant to Laguro the
            rights in and to such User Content, as contemplated under these
            Terms; and (ii) neither the User Content nor your posting,
            uploading, publication, submission or transmittal of the User
            Content or Laguro&apos;s use of the User Content (or any portion
            thereof) will infringe, misappropriate or violate a third
            party&apos;s patent, copyright, trademark, trade secret, moral
            rights or other proprietary or intellectual property rights, or
            rights of publicity or privacy, or result in the violation of any
            applicable law or regulation.
        </Paragraph>
        <Paragraph>
            5.7 You will not post, upload, publish, submit or transmit any User
            Content that: (i) is fraudulent, false, misleading (directly or by
            omission or failure to update information) or deceptive; (ii) is
            defamatory, libelous, obscene, pornographic, vulgar or offensive;
            (iii) promotes discrimination, bigotry, racism, hatred, harassment
            or harm against any individual or group; (iv) is violent or
            threatening or promotes violence or actions that are threatening to
            any other person or animal; (v) promotes illegal or harmful
            activities or substances; or (vi) violates any Laguro policy. Laguro
            may, without prior notice, remove or disable access to any User
            Content that Laguro finds to be in violation of these Terms or
            Laguro’s then-current Policies, or otherwise may be harmful or
            objectionable to Laguro, its Users, third parties, or property.
        </Paragraph>
        <Paragraph>
            5.8 Laguro respects copyright law and expects its Users to do the
            same. If you believe that any content on the Laguro Platform
            infringes copyrights you own, please notify us.
        </Paragraph>

        <BoldParagraph fontSize={2}>6. Payments and Service Fees</BoldParagraph>
        <Paragraph>
            6.1 Laguro may charge fees to Dentists and/or Patients
            (collectively, &quot;<BoldSpan>Service Fees</BoldSpan>&quot;) in
            consideration for the use of the Laguro Platform.
        </Paragraph>
        <Paragraph>
            6.2 Any applicable Service Fees (including any applicable Taxes)
            will be displayed to a Dentist or Patient prior to the transaction
            taking place. Laguro reserves the right to change the Service Fees
            at any time, and will provide Users adequate notice of any fee
            changes before they become effective.
        </Paragraph>
        <Paragraph>
            6.3 You are responsible for paying any Service Fees that you owe to
            Laguro. The applicable Service Fees (including any applicable Taxes)
            are collected by Laguro through its payment services vendors. Except
            as otherwise provided on the Laguro Platform, Service Fees are
            non-refundable.
        </Paragraph>
        <Paragraph>
            6.4 In order to use the payment functionality of our application,
            you must open a “Dwolla Platform” account provided by Dwolla, Inc.
            and you must accept the{' '}
            <ExternalLink to="https://www.dwolla.com/legal/tos/">
                Dwolla Terms of Service
            </ExternalLink>{' '}
            and{' '}
            <ExternalLink to="https://www.dwolla.com/legal/privacy/">
                Privacy Policy
            </ExternalLink>
            . Any funds held in the Dwolla account are held by Dwolla’s
            financial institution partners as set out in the Dwolla Terms of
            Service. You authorize us to collect and share with Dwolla your
            personal information including full name, email address, and
            financial information, and you are responsible for the accuracy and
            completeness of that data. You understand that you will access and
            manage your Dwolla account through our application, and Dwolla
            account notifications will be sent by us, not Dwolla. We will
            provide customer support for your Dwolla account activity, and can
            be reached at support@laguro.com.
        </Paragraph>

        <BoldParagraph fontSize={2}>7. [Reserved]</BoldParagraph>

        <BoldParagraph fontSize={2}>
            8. Terms Specific for Dentists
        </BoldParagraph>
        <Paragraph>
            8.1.1 Subject to meeting any requirements (such as completing any
            verification processes) set by Laguro, you can make your Dental
            Services available on the Laguro Platform after your credentials are
            verified. Records of all applicable fees and any applicable Taxes
            (collectively, “Total Fees”) will be stored in your Laguro Account.
            By using the Laguro Platform, you agree to pay the Total Fees for
            any appointment made and Dental Services rendered to a Patient in
            connection with your Laguro Account.
        </Paragraph>
        <Paragraph>
            8.1.2 Upon receipt of an appointment confirmation from Laguro on
            behalf of a Patient, a legally binding agreement is formed between
            you and your Patient, subject to any additional terms and conditions
            that apply, including in particular any rules and restrictions that
            are specified. Laguro will collect the Total Fees upon completion of
            the appointment.
        </Paragraph>
        <Paragraph>
            8.1.3 When a Patient confirms an appointment, you are entering into
            a legally binding agreement with the Patient and are required to
            provide your Service(s) to the Patient as described when the
            appointment request is made.
        </Paragraph>
        <Paragraph>
            8.1.4 Laguro requires that Dentists obtain appropriate and adequate
            insurance. Please review any respective insurance policy carefully,
            and in particular make sure that you are familiar with and
            understand any exclusions to, and any deductibles that may apply
            for, such insurance policy, including, but not limited to, whether
            or not your insurance policy will cover your actions or inactions.
        </Paragraph>

        <BoldParagraph>8.2 Making an Appointment (For Patients)</BoldParagraph>
        <Paragraph>
            You understand that a confirmed appointment is a limited license to
            enter the facilities granted to you by Laguro to enter, occupy and
            receive Services by a Dentist for the duration of your appointment.
        </Paragraph>

        <BoldParagraph fontSize={2}>
            9. Terms specific for Patients
        </BoldParagraph>
        <BoldParagraph>
            9.1 Information regarding the Treatment Cost Estimator Tool
        </BoldParagraph>
        <Paragraph>
            9.1.1 By utilizing the Cost Estimator tool, you agree that you have
            read the information below, are accessing this information for
            educational purposes of learning how much a particular treatment may
            cost for dental care services you are considering receiving, and
            will not use the information in this tool for a commercial or
            anti-competitive purpose. The costs provided in this tool are
            estimates only and are not a guarantee of payment or benefits. Your
            actual cost may be higher or lower than the estimate for various
            reasons.
        </Paragraph>
        <BoldParagraph>
            9.2 General information regarding your health care
        </BoldParagraph>
        <Paragraph>
            9.2.1 The information and content (collectively,
            &quot;Content&quot;) on this website is for your general educational
            information only. The Content cannot, and is not intended to,
            replace the relationship that you have with your health care
            professionals. The Content on this website is not medical advice.
            You should always talk to your health care professionals for
            information concerning diagnosis and treatment, including
            information regarding which drugs or treatment may be appropriate
            for you. None of the information on this website represents or
            warrants that any particular drug or treatment is safe, appropriate
            or effective for you. Health information changes quickly. Therefore,
            it is always best to confirm information with your health care
            professionals.
        </Paragraph>
        <Paragraph>
            The Cost Estimator tool sometimes groups together, into
            &quot;treatment categories,&quot; services that are often delivered
            together to address a particular dental problem. The description of
            different treatment categories, and the inclusion of particular
            services in a treatment category, is not advice that any particular
            treatment category is the right treatment for you or that you should
            not obtain any particular treatment. All of those matters are things
            that you should decide, in consultation with your dental care
            professionals. This cost estimator is intended for use in the 50
            states (United States). If you live outside the U.S., you may see
            information on this cost estimator about products or services that
            are not available or authorized in your country.
        </Paragraph>
        <BoldParagraph>
            9.3 General information regarding your dental benefits
        </BoldParagraph>
        <Paragraph>
            9.3.1 Nothing on this website guarantees eligibility, coverage, or
            payment, or determines or guarantees the benefits, limitations or
            exclusions of your coverage. For a complete description of the
            details of your coverage, please refer to your coverage documents.
            Estimates may vary depending on your benefit plan and the state you
            live in. Claims will be processed when received according to your
            plan provisions.
        </Paragraph>
        <Paragraph>
            9.3.2 You may be responsible for the cost of procedures or services
            not covered by your plan.
        </Paragraph>
        <Paragraph>
            9.3.3 Use of this website in no way increases or decreases the
            benefits available under a dental benefit plan. If there is any
            conflict or discrepancy between the Content on this website and your
            coverage documents, your coverage documents will control.
        </Paragraph>
        <Paragraph>
            9.3.4 Pre-authorizations or referrals are required for certain
            benefit plans and certain dental care providers. Refer to your
            benefit plan to determine whether these requirements apply to you.
        </Paragraph>
        <Paragraph>
            9.3.5 Preventive services are included in this tool. Preventive care
            coverage varies by plan and by demographic considerations such as
            age. Refer to your benefit plan to determine whether preventive
            services are covered for you.
        </Paragraph>
        <BoldParagraph>
            9.4 General information regarding cost estimates
        </BoldParagraph>
        <Paragraph>
            9.4.1 Do not avoid getting dental care based on the cost information
            provided on this website.
        </Paragraph>
        <Paragraph>
            9.4.2 This website shows estimates of certain dental care costs.
        </Paragraph>
        <Paragraph>
            9.4.3 The version of the Cost Estimator that is available publicly
            (does not require sign-in credentials) uses aggregated historical
            cost data for the procedure in question. The secure version
            (available only after you sign in) uses procedure costs or cost
            ranges as reflected in provider fee schedules and aggregated
            historical cost data.
        </Paragraph>
        <Paragraph>
            9.4.4 The cost estimates provided may be different from your actual
            costs for several reasons, including but not limited to, your unique
            dental circumstances and the decisions made by you and your dental
            professionals as to what services you will receive, deviations
            between the anticipated scope of services and the services actually
            provided, and the characteristics of your particular plan.
        </Paragraph>
        <BoldParagraph>9.5 Other Terms</BoldParagraph>
        <Paragraph>
            9.5.1 If you are experiencing a medical or dental emergency, you
            should seek appropriate emergency medical or dental assistance, such
            as calling “911.” Laguro is a platform meant to connect Hosts with
            Dentists and Dentists with Patients. Any Services provided is
            between You and the Dentist exclusively. Laguro is not liable for
            anything that occurs before, during, or after an appointment. All
            services and listings are offered by Hosts and Dentists only.
        </Paragraph>
        <Paragraph>
            9.5.2 From time to time and in its sole discretion, Laguro may
            implement certain incentive programs for its users. For more
            information on the terms and conditions of such programs, please
            visit the following{' '}
            <LaguroLink to="/laguro-credits-terms">page</LaguroLink>.
        </Paragraph>

        <BoldParagraph fontSize={2}>
            10. Appointment Modifications, Cancellations and Refunds, Resolution
            Center
        </BoldParagraph>
        <Paragraph>
            10.1 Patients and Dentists, are responsible for any modifications or
            cancellations to an appointment that they make or publish via the
            Laguro Platform, and agree to pay any additional Fees and/or Taxes
            associated with such modifications or cancellations if applicable.
        </Paragraph>
        <Paragraph>
            10.2 Patients may cancel or reschedule a confirmed appointment at
            any time. The appointment booking fee will not be refunded or
            applied forward towards a new appointment.
        </Paragraph>
        <Paragraph>
            10.3 In certain circumstances, Laguro may decide, in its sole
            discretion, that it is necessary to cancel a confirmed appointment.
            This may be (i) where Laguro believes in good faith, while taking
            the legitimate interests of both parties into account, this is
            necessary to avoid significant harm to Laguro, other Users, third
            parties or property, or (ii) for any of the reasons set out in these
            Terms.
        </Paragraph>

        <BoldParagraph fontSize={2}>11. Ratings and Reviews</BoldParagraph>
        <Paragraph>
            11.1 Within a certain time frame after completing an appointment,
            Users can leave a public review (“<BoldSpan>Review</BoldSpan>”) and
            submit a star rating (“<BoldSpan>Rating</BoldSpan>”) about each
            other. Ratings or Reviews reflect the opinions of individual Users
            and do not reflect the opinion of Laguro. Ratings and Reviews are
            not verified by Laguro for accuracy and may be incorrect or
            misleading.
        </Paragraph>
        <Paragraph>
            11.2 Ratings and Reviews by Users must be accurate and may not
            contain any offensive or defamatory language. Ratings and Reviews
            are subject to Section 5.
        </Paragraph>
        <Paragraph>
            11.3 Users are prohibited from manipulating the Ratings and Reviews
            system in any manner, such as instructing a third party to write a
            positive or negative Review about another User. Laguro, in its sole
            authority, may monitor, police, and remove Ratings and Reviews from
            the Ratings and Reviews system periodically to mitigate such
            manipulation.
        </Paragraph>
        <Paragraph>
            11.4 Ratings and Reviews are part of a User’s public profile and may
            also be surfaced elsewhere on the Laguro Platform (such as the
            Listing page) together with other relevant information such as
            number of cancellations, average response time and other
            information.
        </Paragraph>

        <BoldParagraph fontSize={2}>
            12. Damage to Laguro Space, Disputes between Users
        </BoldParagraph>
        <Paragraph>
            12.1 As a Dentist, you are responsible for leaving the Laguro Space
            (including any personal or other property located at the Laguro
            Space) in the condition it was in when you arrived. You are
            responsible for your own acts and omissions and are also responsible
            for the acts and omissions of any individuals whom you invite to, or
            otherwise provide access to, excluding Laguro’s staff (and the
            individuals the Laguro invites to the center, if applicable).
        </Paragraph>
        <Paragraph>
            12.2 In the event Laguro claims and provides evidence that you as a
            Dentist have damaged property existing in or on Laguro Space, or any
            personal or other property at a Laguro Space (&quot;
            <BoldSpan>Damage Claim</BoldSpan>&quot;), Laguro may seek equitable
            compensation from you. You will be given an opportunity to respond.
            If you agree to compensate Laguro for the damaged property, or
            Laguro determines in its sole discretion that you are responsible
            for the Damage Claim, Laguro will collect any such sums from you
            required to cover the Damage Claim. Laguro also reserves the right
            to otherwise collect payment from you and pursue any remedies
            available to Laguro in this regard in situations in which you are
            responsible for a Damage Claim.
        </Paragraph>
        <Paragraph>
            12.3 Users agree to cooperate with and assist Laguro in good faith,
            and to provide Laguro with such information and take such actions as
            may be reasonably requested by Laguro, in connection with any Damage
            Claims or other complaints or claims made by Users relating to (i)
            booked Listings or any personal or other property located at a
            Laguro Space. A User shall, upon Laguro&apos;s reasonable request
            and at no cost to the User, participate in mediation or a similar
            resolution process with another User, which process will be
            conducted by Laguro or a third party selected by Laguro or its
            insurer, with respect to losses for which a User is requesting
            payment from Laguro.
        </Paragraph>
        <Paragraph>
            12.4 If you are a Dentist, you understand and agree that Laguro may
            make a claim under your insurance policy related to any damage or
            loss that you may have caused, or been responsible for, to any
            personal or other property of the Laguro. You agree to cooperate
            with and assist Laguro in good faith, and to provide Laguro with
            such information as may be reasonably requested by Laguro, to make a
            claim under your insurance policy, including, but not limited to,
            executing documents and taking such further acts as Laguro may
            reasonably request to assist Laguro in accomplishing the foregoing.
        </Paragraph>

        <BoldParagraph fontSize={2}>13. Taxes</BoldParagraph>
        <Paragraph>
            13.1 As a Dentist, you are solely responsible for determining your
            obligations to report, collect, remit or include in your Fees any
            applicable taxes (&quot;<BoldSpan>Taxes</BoldSpan>&quot;).
        </Paragraph>
        <Paragraph>
            13.2 Tax regulations may require us to collect appropriate Tax
            information from Dentists, or to withhold Taxes from payouts to
            Users, or both.
        </Paragraph>

        <BoldParagraph fontSize={2}>14. Prohibited Activities</BoldParagraph>
        <Paragraph>
            14.1 You are solely responsible for compliance with any and all
            laws, rules, regulations, and Tax obligations that may apply to your
            use of the Laguro Platform. In connection with your use of the
            Laguro Platform, you will not and will not assist or enable others
            to:
        </Paragraph>
        <Box is="ul">
            <Box is="li">
                <Paragraph>
                    breach or circumvent any applicable laws or regulations,
                    agreements with third-parties, third-party rights, or our
                    Terms or Policies;
                </Paragraph>
            </Box>
            <Box is="li">
                <Paragraph>
                    use the Laguro Platform or Collective Content for any
                    commercial or other purposes that are not expressly
                    permitted by these Terms or in a manner that falsely implies
                    Laguro endorsement, partnership or otherwise misleads others
                    as to your affiliation with Laguro;
                </Paragraph>
            </Box>
            <Box is="li">
                <Paragraph>
                    copy, store or otherwise access or use any information,
                    including personally identifiable information about any
                    other User, contained on the Laguro Platform in any way that
                    is inconsistent with Laguro’s Privacy Policy or these Terms
                    or that otherwise violates the privacy rights of Users or
                    third parties;
                </Paragraph>
            </Box>
            <Box is="li">
                <Paragraph>
                    use the Laguro Platform in connection with the distribution
                    of unsolicited commercial messages (&quot;spam&quot;);
                </Paragraph>
            </Box>
            <Box is="li">
                <Paragraph>
                    use the Laguro Platform to request, make or make or accept
                    an appointment independent of the Laguro Platform, to
                    circumvent any Service Fees or for any other reason. If you
                    do so, you acknowledge and agree that you: (i) would be in
                    breach of these Terms; (ii) accept all risks and
                    responsibility for such payment, and (iii) hold Laguro
                    harmless from any liability for such payment;
                </Paragraph>
            </Box>
            <Box is="li">
                <Paragraph>
                    discriminate against or harass anyone on the basis of race,
                    national origin, religion, gender, gender identity, physical
                    or mental disability, medical condition, marital status, age
                    or sexual orientation, or otherwise engage in any violent,
                    harmful, abusive or disruptive behavior;
                </Paragraph>
            </Box>
            <Box is="li">
                <Paragraph>
                    misuse or abuse any services associated with the Laguro as
                    determined by Laguro in its sole discretion;
                </Paragraph>
            </Box>
            <Box is="li">
                <Paragraph>
                    use, display, mirror or frame the Laguro Platform or
                    Collective Content, or any individual element within the
                    Laguro Platform, Laguro&apos;s name, any Laguro trademark,
                    logo or other proprietary information, or the layout and
                    design of any page or form contained on a page in the Laguro
                    Platform, without Laguro&apos;s express written consent;
                </Paragraph>
            </Box>
            <Box is="li">
                <Paragraph>
                    dilute, tarnish or otherwise harm the Laguro brand in any
                    way, including through unauthorized use of Collective
                    Content, registering and/or using Laguro or derivative terms
                    in domain names, trade names, trademarks or other source
                    identifiers, or registering and/or using domains names,
                    trade names, trademarks or other source identifiers that
                    closely imitate or are confusingly similar to Laguro
                    domains, trademarks, taglines, promotional campaigns or
                    Collective Content;
                </Paragraph>
            </Box>
            <Box is="li">
                <Paragraph>
                    use any robots, spider, crawler, scraper or other automated
                    means or processes to access, collect data or other content
                    from or otherwise interact with the Laguro Platform for any
                    purpose;
                </Paragraph>
            </Box>
            <Box is="li">
                <Paragraph>
                    avoid, bypass, remove, deactivate, impair, descramble, or
                    otherwise attempt to circumvent any technological measure
                    implemented by Laguro or any of Laguro&apos;s providers or
                    any other third party to protect the Laguro Platform;
                </Paragraph>
            </Box>
            <Box is="li">
                <Paragraph>
                    attempt to decipher, decompile, disassemble or reverse
                    engineer any of the software used to provide the Laguro
                    Platform;
                </Paragraph>
            </Box>
            <Box is="li">
                <Paragraph>
                    take any action that damages or adversely affects, or could
                    damage or adversely affect the performance or proper
                    functioning of the Laguro Platform;
                </Paragraph>
            </Box>
            <Box is="li">
                <Paragraph>
                    export, re-export, import, or transfer the Application
                    except as authorized by United States law, the export
                    control laws of your jurisdiction, and any other applicable
                    laws; or
                </Paragraph>
            </Box>
            <Box is="li">
                <Paragraph>
                    violate or infringe anyone else’s rights or otherwise cause
                    harm to anyone.
                </Paragraph>
            </Box>
        </Box>
        <Paragraph>
            14.2 You acknowledge that Laguro has no obligation to monitor the
            access to or use of the Laguro Platform by any User or to review,
            disable access to, or edit any User Content, but has the right to do
            so to (i) operate, secure and improve the Laguro Platform (including
            without limitation for fraud prevention, risk assessment,
            investigation and customer support purposes); (ii) ensure Users’
            compliance with these Terms; (iii) comply with applicable law or the
            order or requirement of a court, law enforcement or other
            administrative agency or governmental body; (iv) respond to User
            Content that it determines is harmful or objectionable; or (v) as
            otherwise set forth in these Terms. Users agree to cooperate with
            and assist Laguro in good faith, and to provide Laguro with such
            information and take such actions as may be reasonably requested by
            Laguro with respect to any investigation undertaken by Laguro or a
            representative of Laguro regarding the use or abuse of the Laguro
            Platform.
        </Paragraph>
        <Paragraph>
            14.3 If you feel that any User you interact with, whether online or
            in person, is acting or has acted inappropriately, including but not
            limited to anyone who (i) engages in offensive, violent or sexually
            inappropriate behavior, (ii) you suspect of stealing from you, or
            (iii) engages in any other disturbing conduct, you should
            immediately report such person to the appropriate authorities and
            then to Laguro by contacting us with your police station and report
            number (if available). You agree that any report you make will not
            obligate us to take any action (beyond that required by law, if
            any).
        </Paragraph>

        <BoldParagraph fontSize={2}>
            15. Term and Termination, Suspension and other Measures
        </BoldParagraph>
        <Paragraph>
            15.1 This Agreement shall be effective for a 30-day term, at the end
            of which it will automatically and continuously renew for subsequent
            30-day terms until such time when you or Laguro terminate the
            Agreement in accordance with this provision.
        </Paragraph>
        <Paragraph>
            15.2 You may terminate this Agreement at any time by sending us an
            email. If you cancel your Laguro Account as a Dentist, any confirmed
            appointment(s) will be automatically cancelled..
        </Paragraph>
        <Paragraph>
            15.3 Laguro may immediately, without notice, terminate this
            Agreement and/or stop providing access to the Laguro Platform if (i)
            you have materially breached your obligations under these Terms, the
            Payments Terms or our Policies, (ii) you have violated applicable
            laws, regulations or third party rights, or (iii) Laguro believes in
            good faith that such action is reasonably necessary to protect the
            personal safety or property of Laguro, its Users, or third parties
            (for example in the case of fraudulent behavior of a User).
        </Paragraph>
        <Paragraph>
            15.4 In addition, Laguro may take any of the following measures (i)
            to comply with applicable law, or the order or request of a court,
            law enforcement or other administrative agency or governmental body,
            or if (ii) you have breached these Terms, the Payments Terms, our
            Policies or Standards, applicable laws, regulations, or third party
            rights, (iii) you have provided inaccurate, fraudulent, outdated or
            incomplete information during the Laguro Account registration
            process or thereafter, (iv) you and/or your Dental Services at any
            time fail to meet any applicable quality or eligibility criteria,
            (v) you have repeatedly received poor Ratings or Reviews or Laguro
            otherwise becomes aware of or has received complaints about your
            performance or conduct, (vi) you have repeatedly cancelled confirmed
            appointments or failed to respond to appointment requests without a
            valid reason, or (vii) Laguro believes in good faith that such
            action is reasonably necessary to protect the personal safety or
            property of Laguro, its Users, or third parties, or to prevent fraud
            or other illegal activity:
        </Paragraph>
        <Box is="ul">
            <Box is="li">
                <Paragraph>
                    refuse to surface, delete or delay any Ratings, Reviews, or
                    other User Content;
                </Paragraph>
            </Box>
            <Box is="li">
                <Paragraph>
                    cancel any pending or confirmed appointments;
                </Paragraph>
            </Box>
            <Box is="li">
                <Paragraph>
                    limit your access to or use of the Laguro Platform;
                </Paragraph>
            </Box>
            <Box is="li">
                <Paragraph>
                    temporarily or permanently revoke any special status
                    associated with your Laguro Account;
                </Paragraph>
            </Box>
            <Box is="li">
                <Paragraph>
                    temporarily or in case of severe or repeated offenses
                    permanently suspend your Laguro Account and stop providing
                    access to the Laguro Platform.
                </Paragraph>
            </Box>
        </Box>

        <Paragraph>
            In case of non-material breaches and where appropriate, you will be
            given notice of any intended measure by Laguro and an opportunity to
            resolve the issue to Laguro&apos;s reasonable satisfaction.
        </Paragraph>
        <Paragraph>
            15.5 When this Agreement has been terminated, you are not entitled
            to a restoration of your Laguro Account or any of your User Content.
            If your access to or use of the Laguro Platform has been limited or
            your Laguro Account has been suspended or this Agreement has been
            terminated by us, you may not register a new Laguro Account or
            access and use the Laguro Platform through an Laguro Account of
            another User.{' '}
        </Paragraph>

        <BoldParagraph fontSize={2}>16. Disclaimers</BoldParagraph>
        <BoldParagraph>
            If you choose to use the Laguro Platform or Collective Content, you
            do so voluntarily and at your sole risk. The Laguro Platform and
            Collective Content is provided “as is”, without warranty of any
            kind, either express or implied.
        </BoldParagraph>
        <BoldParagraph>
            You agree that you have had whatever opportunity you deem necessary
            to investigate the Laguro Services, laws, rules, or regulations that
            may be applicable to the Services you are receiving and that you are
            not relying upon any statement of law or fact made by Laguro
            relating to its Services.
        </BoldParagraph>
        <BoldParagraph>
            If we choose to conduct identity verification or background checks
            on any User, to the extent permitted by applicable law, we disclaim
            warranties of any kind, either express or implied, that such checks
            will identify prior misconduct by a User or guarantee that a User
            will not engage in misconduct in the future.
        </BoldParagraph>
        <BoldParagraph>
            You agree that some Dental Services may carry inherent risk, and by
            participating in such services, you choose to assume those risks
            voluntarily. For example, some Dental Services may carry risk of
            illness, bodily injury, disability, or death, and you freely and
            willfully assume those risks by choosing to participate in those
            Services. You assume full responsibility for the choices you make
            before, during and after your participation in a Service. If you are
            bringing a minor as a Patient, you are solely responsible for the
            supervision of that minor throughout the duration of the Service and
            to the maximum extent permitted by law, you agree to release and
            hold harmless Laguro from all liabilities and claims that arise in
            any way from any injury, death, loss or harm that occurs to that
            minor during the Service or in any way related to your Service.
        </BoldParagraph>
        <BoldParagraph>
            The foregoing disclaimers apply to the maximum extent permitted by
            law. You may have other statutory rights. However, the duration of
            statutorily required warranties, if any, shall be limited to the
            maximum extent permitted by law.
        </BoldParagraph>

        <BoldParagraph fontSize={2}>17. Liability</BoldParagraph>
        <BoldParagraph>
            You acknowledge and agree that, to the maximum extent permitted by
            law, the entire risk arising out of your access to and use of the
            Laguro Platform and Collective Content, your publishing or booking
            of any Listing via the Laguro Platform, use of any other Service, or
            any other interaction you have with other Users whether in person or
            online remains with you. Neither Laguro nor any other party involved
            in creating, producing, or delivering the Laguro Platform or
            Collective Content will be liable for any incidental, special,
            exemplary or consequential damages, including lost profits, loss of
            data or loss of goodwill, service interruption, computer damage or
            system failure or the cost of substitute products or services, or
            for any damages for personal or bodily injury or emotional distress
            arising out of or in connection with (i) these Terms, (ii) from the
            use of or inability to use the Laguro Platform or Collective
            Content, (iii) from any communications, interactions or meetings
            with other Users or other persons with whom you communicate,
            interact or meet with as a result of your use of the Laguro
            Platform, whether based on warranty, contract, tort (including
            negligence), product liability or any other legal theory, and
            whether or not Laguro has been informed of the possibility of such
            damage, even if a limited remedy set forth herein is found to have
            failed of its essential purpose. Except for our obligations to pay
            amounts to applicable Dentists pursuant to these Terms, in no event
            will Laguro’s aggregate liability arising out of or in connection
            with these Terms and your use of the Laguro Platform including, but
            not limited to, the use of or inability to use the Laguro Platform
            or Collective Content and in connection with any Service or
            interactions with any other Users, exceed the amounts you have paid
            or owe for Services via the Laguro Platform as a Dentist or Patient
            in the six (6) month period prior to the event giving rise to the
            liability, or one hundred U.S. dollars (US$100), if no such payments
            have been made, as applicable. The limitations of damages set forth
            above are fundamental elements of the basis of the bargain between
            Laguro and you.
        </BoldParagraph>

        <BoldParagraph fontSize={2}>18. Indemnification</BoldParagraph>
        <Paragraph>
            You agree to release, defend (at Laguro’s option), indemnify, and
            hold Laguro and its affiliates and subsidiaries, and their officers,
            directors, employees and agents, harmless from and against any
            claims, liabilities, damages, losses, and expenses, including,
            without limitation, reasonable legal and accounting fees, arising
            out of or in any way connected with (i) your breach of these Terms
            or our Policies or Standards, (ii) your improper use of the Laguro
            Platform or any Laguro Services, (iii) your interaction with any
            User, including without limitation any injuries, losses or damages
            (whether compensatory, direct, incidental, consequential or
            otherwise) of any kind arising in connection with or as a result of
            such interaction, (iv) your breach of any laws, regulations or third
            party rights.
        </Paragraph>

        <BoldParagraph fontSize={2}>
            19. Dispute Resolution and Arbitration Agreement
        </BoldParagraph>
        <Paragraph>
            19.1 Overview of Dispute Resolution Process. Laguro is committed to
            participating in a consumer-friendly dispute resolution process. To
            that end, these Terms provide for a two-part process for individuals
            to whom Section 20.1 applies: (1) an informal negotiation directly
            with Laguro’s customer service team, and (2) a binding arbitration
            administered by the American Arbitration Association (“
            <BoldSpan>AAA</BoldSpan>”) using its specially designed Consumer
            Arbitration Rules (as modified by this Section 19 and except as
            provided in Section 19.6). Specifically, the Consumer Arbitration
            Rules provide:
        </Paragraph>
        <Box is="ul">
            <Box is="li">
                <Paragraph>
                    Claims can be filed with AAA online (
                    <ExternalLink to="http://www.adr.org/">
                        www.adr.org
                    </ExternalLink>
                    );
                </Paragraph>
            </Box>
            <Box is="li">
                <Paragraph>
                    Arbitrators must be neutral and no party may unilaterally
                    select an arbitrator;
                </Paragraph>
            </Box>
            <Box is="li">
                <Paragraph>
                    Arbitrators must disclose any bias, interest in the result
                    of the arbitration, or relationship with any party;
                </Paragraph>
            </Box>
            <Box is="li">
                <Paragraph>
                    Parties retain the right to seek relief in small claims
                    court for certain claims, at their option;
                </Paragraph>
            </Box>
            <Box is="li">
                <Paragraph>
                    The initial filing fee for the consumer is capped at $200;
                </Paragraph>
            </Box>
            <Box is="li">
                <Paragraph>
                    The consumer gets to elect the hearing location and can
                    elect to participate live, by phone, video conference, or,
                    for claims under $25,000, by the submission of documents;
                </Paragraph>
            </Box>
            <Box is="li">
                <Paragraph>
                    The arbitrator can grant any remedy that the parties could
                    have received in court to resolve the party’s individual
                    claim.
                </Paragraph>
            </Box>
        </Box>
        <Paragraph>
            19.2 Pre-Arbitration Dispute Resolution and Notification. Prior to
            initiating an arbitration, you and Laguro each agree to notify the
            other party of the dispute and attempt to negotiate an informal
            resolution to it first. We will contact you at the email address you
            have provided to us; you can contact Laguro’s customer service team
            by emailing us. If after a good faith effort to negotiate one of us
            feels the dispute has not and cannot be resolved informally, the
            party intending to pursue arbitration agrees to notify the other
            party via email prior to initiating the arbitration. In order to
            initiate arbitration, a claim must be filed with the AAA and the
            written Demand for Arbitration (available at www.adr.org) provided
            to the other party, as specified in the AAA Rules.
        </Paragraph>
        <BoldParagraph>
            19.3 Agreement to Arbitrate. You and Laguro mutually agree that any
            dispute, claim or controversy arising out of or relating to these
            Terms or the breach, termination, enforcement or interpretation
            thereof, or to the use of the Laguro Platform, the Services, the
            Group Payment Service, or the Collective Content (collectively,
            “Disputes”) will be settled by binding arbitration (the “Arbitration
            Agreement”). If there is a dispute about whether this Arbitration
            Agreement can be enforced or applies to our Dispute, you and Laguro
            agree that the arbitrator will decide that issue.
        </BoldParagraph>
        <Paragraph>
            19.4 Exceptions to Arbitration Agreement. You and Laguro each agree
            that the following claims are exceptions to the Arbitration
            Agreement and will be brought in a judicial proceeding in a court of
            competent jurisdiction: (i) Any claim related to actual or
            threatened infringement, misappropriation or violation of a party’s
            copyrights, trademarks, trade secrets, patents, or other
            intellectual property rights; (ii) Any claim seeking emergency
            injunctive relief based on exigent circumstances (e.g., imminent
            danger or commission of a crime, hacking, cyber-attack).
        </Paragraph>
        <Paragraph>
            19.5 Arbitration Rules and Governing Law. This Arbitration Agreement
            evidences a transaction in interstate commerce and thus the Federal
            Arbitration Act governs the interpretation and enforcement of this
            provision. The arbitration will be administered by AAA in accordance
            with the Consumer Arbitration Rules and/or other AAA arbitration
            rules determined to be applicable by the AAA (the “
            <BoldSpan>AAA Rules</BoldSpan>“) then in effect, except as modified
            here. The AAA Rules are available at www.adr.org or by calling the
            AAA at 1–800–778–7879.
        </Paragraph>
        <Paragraph>
            19.6 Modification to AAA Rules - Arbitration Hearing/Location. In
            order to make the arbitration most convenient to you, Laguro agrees
            that any required arbitration hearing may be conducted, at your
            option, (a) in the county where you reside; (b) in Alameda County;
            (c) in any other location to which you and Laguro both agree; (d)
            via phone or video conference; or (e) for any claim or counterclaim
            under $25,000, by solely the submission of documents to the
            arbitrator.
        </Paragraph>
        <Paragraph>
            19.7 Modification of AAA Rules - Attorney’s Fees and Costs. You and
            Laguro agree that Laguro will be responsible for payment of the
            balance of any initial filing fee under the AAA Rules in excess of
            $200 for claims of $75,000 or less. You may be entitled to seek an
            award of attorney fees and expenses if you prevail in arbitration,
            to the extent provided under applicable law and the AAA rules.
            Unless the arbitrator determines that your claim was frivolous or
            filed for the purpose of harassment, Laguro agrees it will not seek,
            and hereby waives all rights it may have under applicable law or the
            AAA Rules, to recover attorneys’ fees and expenses if it prevails in
            arbitration.
        </Paragraph>
        <Paragraph>
            19.8 Arbitrator’s Decision. The arbitrator’s decision will include
            the essential findings and conclusions upon which the arbitrator
            based the award. Judgment on the arbitration award may be entered in
            any court with proper jurisdiction. The arbitrator may award
            declaratory or injunctive relief only on an individual basis and
            only to the extent necessary to provide relief warranted by the
            claimant’s individual claim.
        </Paragraph>
        <BoldParagraph>
            19.9 Jury Trial Waiver. You and Laguro acknowledge and agree that we
            are each waiving the right to a trial by jury as to all arbitrable
            Disputes.
        </BoldParagraph>
        <BoldParagraph>
            19.10 No Class Actions or Representative Proceedings. You and Laguro
            acknowledge and agree that we are each waiving the right to
            participate as a plaintiff or class member in any purported class
            action lawsuit, class-wide arbitration, private attorney-general
            action, or any other representative proceeding as to all Disputes.
            Further, unless you and Laguro both otherwise agree in writing, the
            arbitrator may not consolidate more than one party’s claims and may
            not otherwise preside over any form of any class or representative
            proceeding. If this paragraph is held unenforceable with respect to
            any Dispute, then the entirety of the Arbitration Agreement will be
            deemed void with respect to such Dispute.
        </BoldParagraph>
        <Paragraph>
            19.11 Severability. Except as provided in Section 19.10, in the
            event that any portion of this Arbitration Agreement is deemed
            illegal or unenforceable, such provision shall be severed and the
            remainder of the Arbitration Agreement shall be given full force and
            effect.
        </Paragraph>
        <Paragraph>
            19.12 Changes. Notwithstanding the provisions of Section 3
            (“Modification of these Terms”), if Laguro changes this Section 19
            (“Dispute Resolution and Arbitration Agreement”) after the date you
            last accepted these Terms (or accepted any subsequent changes to
            these Terms), you may reject any such change by sending us written
            notice (including by email) within thirty (30) days of the date such
            change became effective, as indicated in the “Last Updated” date
            above or in the date of Laguro’s email to you notifying you of such
            change. By rejecting any change, you are agreeing that you will
            arbitrate any Dispute between you and Laguro in accordance with the
            provisions of the “Dispute Resolution and Arbitration Agreement”
            section as of the date you last accepted these Terms (or accepted
            any subsequent changes to these Terms).
        </Paragraph>
        <Paragraph>
            19.13 Survival. Except as provided in Section 19.11, this Section 19
            will survive any termination of these Terms and will continue to
            apply even if you stop using the Laguro Platform or terminate your
            Laguro Account.
        </Paragraph>

        <BoldParagraph fontSize={2}>
            20. Applicable Law and Jurisdiction
        </BoldParagraph>
        <Paragraph>
            If your Country of Residence is the United States, these Terms will
            be interpreted in accordance with the laws of the State of
            California and the United States of America, without regard to
            conflict-of-law provisions. Judicial proceedings (other than small
            claims actions) that are excluded from the Arbitration Agreement in
            Section 19 must be brought in state or federal court in Alameda
            County, California, unless we both agree to some other location. You
            and we both consent to venue and personal jurisdiction in Alameda
            County, California.
        </Paragraph>

        <BoldParagraph fontSize={2}>21. General Provisions</BoldParagraph>
        <Paragraph>
            21.1 Except as they may be supplemented by additional terms and
            conditions, policies, guidelines or standards, these Terms
            constitute the entire Agreement between Laguro and you pertaining to
            the subject matter hereof, and supersede any and all prior oral or
            written understandings or agreements between Laguro and you in
            relation to the access to and use of the Laguro Platform.
        </Paragraph>
        <Paragraph>
            21.2 No joint venture, partnership, employment, or agency
            relationship exists between you and Laguro as a result of this
            Agreement or your use of the Laguro Platform.
        </Paragraph>
        <Paragraph>
            21.3 These Terms do not and are not intended to confer any rights or
            remedies upon any person other than the parties.
        </Paragraph>
        <Paragraph>
            21.4 If any provision of these Terms is held to be invalid or
            unenforceable, such provision will be struck and will not affect the
            validity and enforceability of the remaining provisions.
        </Paragraph>
        <Paragraph>
            21.5 Laguro’s failure to enforce any right or provision in these
            Terms will not constitute a waiver of such right or provision unless
            acknowledged and agreed to by us in writing. Except as expressly set
            forth in these Terms, the exercise by either party of any of its
            remedies under these Terms will be without prejudice to its other
            remedies under these Terms or otherwise permitted under law.
        </Paragraph>
        <Paragraph>
            21.6 You may not assign, transfer or delegate this Agreement and
            your rights and obligations hereunder without Laguro&apos;s prior
            written consent. Laguro may without restriction assign, transfer or
            delegate this Agreement and any rights and obligations hereunder, at
            its sole discretion, with 30 days prior notice. Your right to
            terminate this Agreement at any time remains unaffected.
        </Paragraph>
        <Paragraph>
            21.7 Unless specified otherwise, any notices or other communications
            to Users permitted or required under this Agreement, will be
            provided electronically and given by Laguro via email, Laguro
            Platform notification, or messaging service (including SMS and
            WeChat).
        </Paragraph>
        <Paragraph>
            21.8 If you have any questions about these Terms please email us at
            support@laguro.com.
        </Paragraph>
    </Fragment>
);

export default Terms;
