"""Default questionnaires as Python constants for Vercel serverless (no DB persistence needed)."""

def get_default_questionnaires():
    """Return all 4 default ISO questionnaires as a list of dicts with _id fields."""
    return [
        _iso45001(),
        _iso9001(),
        _iso14001(),
        _fssc22000(),
    ]

def get_default_questionnaire_by_id(qid):
    """Find a default questionnaire by its _id."""
    for q in get_default_questionnaires():
        if q["_id"] == qid:
            return q
    return None

def _iso45001():
    return {
        "_id": "default-iso-45001",
        "name": "ISO 45001:2018",
        "description": "Occupational Health and Safety Management Systems - Internal Audit Questionnaire",
        "is_default": True,
        "clauses": [
            {"clause_no": "4", "title": "Context of the Organisation", "subclauses": [
                {"clause_no": "4.1", "title": "Understanding the organisation and its context", "questions": [
                    {"id": "q_4_1_1", "question_text": "Has the plant identified internal and external issues affecting OHS performance?", "order": 1}]},
                {"clause_no": "4.2", "title": "Understanding needs of workers and interested parties", "questions": [
                    {"id": "q_4_2_1", "question_text": "Are the needs of employees, contractors, legal authorities, and customers identified?", "order": 1}]},
                {"clause_no": "4.3", "title": "Determining the scope of the OH&S management system", "questions": [
                    {"id": "q_4_3_1", "question_text": "Is the scope of OHSMS clearly defined to include production, utilities, lab, WTP, and maintenance?", "order": 1}]},
                {"clause_no": "4.4", "title": "OH&S management system", "questions": [
                    {"id": "q_4_4_1", "question_text": "Are OHSMS processes established, implemented, and maintained across all plant operations?", "order": 1}]}
            ]},
            {"clause_no": "5", "title": "Leadership and Worker Participation", "subclauses": [
                {"clause_no": "5.1", "title": "Leadership and commitment", "questions": [
                    {"id": "q_5_1_1", "question_text": "Does top management demonstrate leadership in promoting a safe work culture?", "order": 1}]},
                {"clause_no": "5.2", "title": "OH&S policy", "questions": [
                    {"id": "q_5_2_1", "question_text": "Is there a documented OH&S policy communicated to all levels?", "order": 1}]},
                {"clause_no": "5.3", "title": "Organisational roles, responsibilities, and authorities", "questions": [
                    {"id": "q_5_3_1", "question_text": "Are the roles of safety officers, first-aiders, and fire wardens clearly defined?", "order": 1}]},
                {"clause_no": "5.4", "title": "Consultation and participation of workers", "questions": [
                    {"id": "q_5_4_1", "question_text": "Are employees involved in safety committees and hazard identification programs?", "order": 1}]}
            ]},
            {"clause_no": "6", "title": "Planning", "subclauses": [
                {"clause_no": "6.1", "title": "Actions to address risks and opportunities", "questions": [
                    {"id": "q_6_1_1", "question_text": "Has the plant identified risks and opportunities related to OHS?", "order": 1}]},
                {"clause_no": "6.2", "title": "OH&S objectives", "questions": [
                    {"id": "q_6_2_1", "question_text": "Are measurable OHS objectives set and monitored?", "order": 1}]}
            ]},
            {"clause_no": "7", "title": "Support", "subclauses": [
                {"clause_no": "7.1", "title": "Resources", "questions": [
                    {"id": "q_7_1_1", "question_text": "Are adequate safety resources (PPE, first aid kits, fire extinguishers) provided?", "order": 1}]},
                {"clause_no": "7.2", "title": "Competence", "questions": [
                    {"id": "q_7_2_1", "question_text": "Are workers trained in first aid, fire safety, and chemical handling?", "order": 1}]},
                {"clause_no": "7.3", "title": "Awareness", "questions": [
                    {"id": "q_7_3_1", "question_text": "Are employees aware of OHS policy, emergency routes, and reporting procedures?", "order": 1}]},
                {"clause_no": "7.4", "title": "Communication", "questions": [
                    {"id": "q_7_4_1", "question_text": "Is there effective communication for safety alerts, incidents, and toolbox talks?", "order": 1}]}
            ]},
            {"clause_no": "8", "title": "Operation", "subclauses": [
                {"clause_no": "8.1", "title": "Operational planning and control", "questions": [
                    {"id": "q_8_1_1", "question_text": "Are safe work procedures implemented for all operations?", "order": 1}]},
                {"clause_no": "8.2", "title": "Emergency preparedness and response", "questions": [
                    {"id": "q_8_2_1", "question_text": "Are emergency response plans in place and drills conducted regularly?", "order": 1}]}
            ]},
            {"clause_no": "9", "title": "Performance Evaluation", "subclauses": [
                {"clause_no": "9.1", "title": "Monitoring and measurement", "questions": [
                    {"id": "q_9_1_1", "question_text": "Are incidents, near misses, and unsafe conditions tracked and analysed?", "order": 1}]},
                {"clause_no": "9.2", "title": "Internal audit", "questions": [
                    {"id": "q_9_2_1", "question_text": "Are OHS internal audits conducted as per plan?", "order": 1}]},
                {"clause_no": "9.3", "title": "Management review", "questions": [
                    {"id": "q_9_3_1", "question_text": "Does management review OHS performance periodically?", "order": 1}]}
            ]},
            {"clause_no": "10", "title": "Improvement", "subclauses": [
                {"clause_no": "10.1", "title": "Incident, nonconformity and corrective action", "questions": [
                    {"id": "q_10_1_1", "question_text": "Are incidents investigated and corrective actions implemented?", "order": 1}]},
                {"clause_no": "10.2", "title": "Continual improvement", "questions": [
                    {"id": "q_10_2_1", "question_text": "Are actions taken to improve safety culture and reduce risks?", "order": 1}]}
            ]}
        ]
    }

def _iso9001():
    return {
        "_id": "default-iso-9001",
        "name": "ISO 9001:2015",
        "description": "Quality Management System - Internal Audit Questionnaire",
        "is_default": True,
        "clauses": [
            {"clause_no": "4", "title": "Context of the Organization", "subclauses": [
                {"clause_no": "4.1", "title": "Understanding the organization and its context", "questions": [
                    {"id": "q_qms_4_1_1", "question_text": "Are internal and external issues relevant to QMS identified?", "order": 1}]},
                {"clause_no": "4.2", "title": "Understanding needs of interested parties", "questions": [
                    {"id": "q_qms_4_2_1", "question_text": "Are interested parties and their requirements identified?", "order": 1}]},
                {"clause_no": "4.3", "title": "Determining the scope of the QMS", "questions": [
                    {"id": "q_qms_4_3_1", "question_text": "Is the scope of the QMS defined and documented?", "order": 1}]},
                {"clause_no": "4.4", "title": "Quality management system and its processes", "questions": [
                    {"id": "q_qms_4_4_1", "question_text": "Are processes needed for QMS identified with their interactions?", "order": 1}]}
            ]},
            {"clause_no": "5", "title": "Leadership", "subclauses": [
                {"clause_no": "5.1", "title": "Leadership and commitment", "questions": [
                    {"id": "q_qms_5_1_1", "question_text": "Does top management demonstrate leadership for QMS effectiveness?", "order": 1}]},
                {"clause_no": "5.2", "title": "Quality Policy", "questions": [
                    {"id": "q_qms_5_2_1", "question_text": "Is quality policy established and communicated?", "order": 1}]},
                {"clause_no": "5.3", "title": "Organizational roles and responsibilities", "questions": [
                    {"id": "q_qms_5_3_1", "question_text": "Are relevant roles and responsibilities defined?", "order": 1}]}
            ]},
            {"clause_no": "6", "title": "Planning", "subclauses": [
                {"clause_no": "6.1", "title": "Actions to address risks and opportunities", "questions": [
                    {"id": "q_qms_6_1_1", "question_text": "Are risks and opportunities determined and addressed?", "order": 1}]},
                {"clause_no": "6.2", "title": "Quality objectives", "questions": [
                    {"id": "q_qms_6_2_1", "question_text": "Are quality objectives established and measurable?", "order": 1}]}
            ]},
            {"clause_no": "7", "title": "Support", "subclauses": [
                {"clause_no": "7.1", "title": "Resources", "questions": [
                    {"id": "q_qms_7_1_1", "question_text": "Are resources provided for QMS?", "order": 1}]},
                {"clause_no": "7.2", "title": "Competence", "questions": [
                    {"id": "q_qms_7_2_1", "question_text": "Is competence determined and training provided?", "order": 1}]},
                {"clause_no": "7.3", "title": "Awareness", "questions": [
                    {"id": "q_qms_7_3_1", "question_text": "Are persons aware of quality policy and their contribution?", "order": 1}]},
                {"clause_no": "7.4", "title": "Communication", "questions": [
                    {"id": "q_qms_7_4_1", "question_text": "Are communications relevant to QMS determined?", "order": 1}]},
                {"clause_no": "7.5", "title": "Documented information", "questions": [
                    {"id": "q_qms_7_5_1", "question_text": "Is documented information controlled and maintained?", "order": 1}]}
            ]},
            {"clause_no": "8", "title": "Operation", "subclauses": [
                {"clause_no": "8.1", "title": "Operational planning and control", "questions": [
                    {"id": "q_qms_8_1_1", "question_text": "Are operational processes planned and controlled?", "order": 1}]},
                {"clause_no": "8.2", "title": "Requirements for products and services", "questions": [
                    {"id": "q_qms_8_2_1", "question_text": "Are customer requirements determined and reviewed?", "order": 1}]},
                {"clause_no": "8.3", "title": "Design and development", "questions": [
                    {"id": "q_qms_8_3_1", "question_text": "Is design and development process established?", "order": 1}]},
                {"clause_no": "8.4", "title": "Control of externally provided processes", "questions": [
                    {"id": "q_qms_8_4_1", "question_text": "Are externally provided processes controlled?", "order": 1}]},
                {"clause_no": "8.5", "title": "Production and service provision", "questions": [
                    {"id": "q_qms_8_5_1", "question_text": "Is production carried out under controlled conditions?", "order": 1}]},
                {"clause_no": "8.6", "title": "Release of products and services", "questions": [
                    {"id": "q_qms_8_6_1", "question_text": "Are products verified before release?", "order": 1}]},
                {"clause_no": "8.7", "title": "Control of nonconforming outputs", "questions": [
                    {"id": "q_qms_8_7_1", "question_text": "Are nonconforming outputs identified and controlled?", "order": 1}]}
            ]},
            {"clause_no": "9", "title": "Performance Evaluation", "subclauses": [
                {"clause_no": "9.1", "title": "Monitoring and measurement", "questions": [
                    {"id": "q_qms_9_1_1", "question_text": "Are monitoring and measurement methods determined?", "order": 1}]},
                {"clause_no": "9.2", "title": "Internal audit", "questions": [
                    {"id": "q_qms_9_2_1", "question_text": "Are internal audits conducted at planned intervals?", "order": 1}]},
                {"clause_no": "9.3", "title": "Management review", "questions": [
                    {"id": "q_qms_9_3_1", "question_text": "Does top management review QMS at planned intervals?", "order": 1}]}
            ]},
            {"clause_no": "10", "title": "Improvement", "subclauses": [
                {"clause_no": "10.1", "title": "General", "questions": [
                    {"id": "q_qms_10_1_1", "question_text": "Are opportunities for improvement determined?", "order": 1}]},
                {"clause_no": "10.2", "title": "Nonconformity and corrective action", "questions": [
                    {"id": "q_qms_10_2_1", "question_text": "Are nonconformities corrected and root causes evaluated?", "order": 1}]},
                {"clause_no": "10.3", "title": "Continual improvement", "questions": [
                    {"id": "q_qms_10_3_1", "question_text": "Does organization continually improve QMS?", "order": 1}]}
            ]}
        ]
    }

def _iso14001():
    return {
        "_id": "default-iso-14001",
        "name": "ISO 14001:2015",
        "description": "Environmental Management System - Internal Audit Questionnaire",
        "is_default": True,
        "clauses": [
            {"clause_no": "4", "title": "Context of the Organization", "subclauses": [
                {"clause_no": "4.1", "title": "Understanding the organization", "questions": [
                    {"id": "q_ems_4_1_1", "question_text": "Are environmental issues identified and reviewed?", "order": 1}]},
                {"clause_no": "4.2", "title": "Interested parties", "questions": [
                    {"id": "q_ems_4_2_1", "question_text": "Are interested parties and their environmental expectations identified?", "order": 1}]},
                {"clause_no": "4.3", "title": "Scope of the EMS", "questions": [
                    {"id": "q_ems_4_3_1", "question_text": "Is the scope of EMS defined and documented?", "order": 1}]},
                {"clause_no": "4.4", "title": "Environmental management system", "questions": [
                    {"id": "q_ems_4_4_1", "question_text": "Are all environmental aspects covered in EMS processes?", "order": 1}]}
            ]},
            {"clause_no": "5", "title": "Leadership", "subclauses": [
                {"clause_no": "5.1", "title": "Leadership and commitment", "questions": [
                    {"id": "q_ems_5_1_1", "question_text": "Does top management demonstrate commitment to environmental protection?", "order": 1}]},
                {"clause_no": "5.2", "title": "Environmental policy", "questions": [
                    {"id": "q_ems_5_2_1", "question_text": "Is there an environmental policy committed to pollution prevention?", "order": 1}]},
                {"clause_no": "5.3", "title": "Organizational roles", "questions": [
                    {"id": "q_ems_5_3_1", "question_text": "Are EMS roles and responsibilities defined?", "order": 1}]}
            ]},
            {"clause_no": "6", "title": "Planning", "subclauses": [
                {"clause_no": "6.1", "title": "Actions to address risks and opportunities", "questions": [
                    {"id": "q_ems_6_1_1", "question_text": "Are environmental aspects, impacts and compliance obligations identified?", "order": 1}]},
                {"clause_no": "6.2", "title": "Environmental objectives", "questions": [
                    {"id": "q_ems_6_2_1", "question_text": "Are environmental objectives defined, measurable and tracked?", "order": 1}]}
            ]},
            {"clause_no": "7", "title": "Support", "subclauses": [
                {"clause_no": "7.1", "title": "Resources", "questions": [
                    {"id": "q_ems_7_1_1", "question_text": "Are sufficient resources available for EMS operation?", "order": 1}]},
                {"clause_no": "7.2", "title": "Competence", "questions": [
                    {"id": "q_ems_7_2_1", "question_text": "Are personnel handling chemicals or waste trained?", "order": 1}]},
                {"clause_no": "7.3", "title": "Awareness", "questions": [
                    {"id": "q_ems_7_3_1", "question_text": "Are employees aware of environmental policy and emergency procedures?", "order": 1}]},
                {"clause_no": "7.4", "title": "Communication", "questions": [
                    {"id": "q_ems_7_4_1", "question_text": "Is communication with external stakeholders documented?", "order": 1}]},
                {"clause_no": "7.5", "title": "Documented information", "questions": [
                    {"id": "q_ems_7_5_1", "question_text": "Are EMS documents and records controlled?", "order": 1}]}
            ]},
            {"clause_no": "8", "title": "Operation", "subclauses": [
                {"clause_no": "8.1", "title": "Operational planning and control", "questions": [
                    {"id": "q_ems_8_1_1", "question_text": "Are operational controls implemented for significant aspects?", "order": 1}]},
                {"clause_no": "8.2", "title": "Emergency preparedness", "questions": [
                    {"id": "q_ems_8_2_1", "question_text": "Is there emergency preparedness plan for chemical spills or fire?", "order": 1}]}
            ]},
            {"clause_no": "9", "title": "Performance Evaluation", "subclauses": [
                {"clause_no": "9.1", "title": "Monitoring and measurement", "questions": [
                    {"id": "q_ems_9_1_1", "question_text": "Are environmental monitoring activities carried out as per plan?", "order": 1}]},
                {"clause_no": "9.2", "title": "Internal audit", "questions": [
                    {"id": "q_ems_9_2_1", "question_text": "Is EMS internal audit conducted as per schedule?", "order": 1}]},
                {"clause_no": "9.3", "title": "Management review", "questions": [
                    {"id": "q_ems_9_3_1", "question_text": "Does management review cover environmental objectives and incidents?", "order": 1}]}
            ]},
            {"clause_no": "10", "title": "Improvement", "subclauses": [
                {"clause_no": "10.1", "title": "General", "questions": [
                    {"id": "q_ems_10_1_1", "question_text": "Are opportunities for environmental improvement identified?", "order": 1}]},
                {"clause_no": "10.2", "title": "Nonconformity and corrective action", "questions": [
                    {"id": "q_ems_10_2_1", "question_text": "Are environmental nonconformities recorded and corrected?", "order": 1}]},
                {"clause_no": "10.3", "title": "Continual improvement", "questions": [
                    {"id": "q_ems_10_3_1", "question_text": "What environmental improvements have been implemented?", "order": 1}]}
            ]}
        ]
    }

def _fssc22000():
    return {
        "_id": "default-fssc-22000",
        "name": "FSSC 22000 V6.0",
        "description": "Food Safety System Certification 22000 - Audit Questionnaire",
        "is_default": True,
        "clauses": [
            {"clause_no": "ISO 22000:2018", "title": "Food Safety Management System", "subclauses": [
                {"clause_no": "4.1", "title": "Understanding the organization", "questions": [
                    {"id": "q_fssc_4_1_1", "question_text": "Has the organization identified internal and external issues affecting FSMS?", "order": 1}]},
                {"clause_no": "4.2", "title": "Understanding interested parties", "questions": [
                    {"id": "q_fssc_4_2_1", "question_text": "Have interested parties and their requirements been defined?", "order": 1}]},
                {"clause_no": "4.3", "title": "Scope of FSMS", "questions": [
                    {"id": "q_fssc_4_3_1", "question_text": "Is the scope of FSMS documented?", "order": 1}]},
                {"clause_no": "4.4", "title": "FSMS", "questions": [
                    {"id": "q_fssc_4_4_1", "question_text": "Is the FSMS established, implemented, and continually improved?", "order": 1}]},
                {"clause_no": "5.1", "title": "Leadership and commitment", "questions": [
                    {"id": "q_fssc_5_1_1", "question_text": "Does top management demonstrate commitment to food safety?", "order": 1}]},
                {"clause_no": "5.2", "title": "Food safety policy", "questions": [
                    {"id": "q_fssc_5_2_1", "question_text": "Is the Food Safety Policy communicated at all levels?", "order": 1}]},
                {"clause_no": "5.3", "title": "Roles and responsibilities", "questions": [
                    {"id": "q_fssc_5_3_1", "question_text": "Are food safety responsibilities assigned to trained personnel?", "order": 1}]},
                {"clause_no": "6.1", "title": "Risks and opportunities", "questions": [
                    {"id": "q_fssc_6_1_1", "question_text": "Have risks and opportunities been identified for each process?", "order": 1}]},
                {"clause_no": "6.2", "title": "Food safety objectives", "questions": [
                    {"id": "q_fssc_6_2_1", "question_text": "Are measurable FSMS objectives set and tracked?", "order": 1}]},
                {"clause_no": "7.1", "title": "Resources", "questions": [
                    {"id": "q_fssc_7_1_1", "question_text": "Are adequate resources provided?", "order": 1}]},
                {"clause_no": "7.2", "title": "Competence", "questions": [
                    {"id": "q_fssc_7_2_1", "question_text": "Is competence ensured through training on GMP, HACCP, BIS?", "order": 1}]},
                {"clause_no": "7.3", "title": "Awareness", "questions": [
                    {"id": "q_fssc_7_3_1", "question_text": "Is awareness on food safety maintained among employees?", "order": 1}]},
                {"clause_no": "7.4", "title": "Communication", "questions": [
                    {"id": "q_fssc_7_4_1", "question_text": "Are internal and external communications defined?", "order": 1}]},
                {"clause_no": "7.5", "title": "Documented information", "questions": [
                    {"id": "q_fssc_7_5_1", "question_text": "Is documented information controlled and updated?", "order": 1}]},
                {"clause_no": "8.1", "title": "Operational planning and control", "questions": [
                    {"id": "q_fssc_8_1_1", "question_text": "Are PRPs implemented as per ISO/TS 22002-1?", "order": 1}]},
                {"clause_no": "8.2", "title": "Traceability", "questions": [
                    {"id": "q_fssc_8_2_1", "question_text": "Are traceability systems available for each batch?", "order": 1}]},
                {"clause_no": "8.3", "title": "Emergency preparedness", "questions": [
                    {"id": "q_fssc_8_3_1", "question_text": "Are emergency plans available for contamination or power failure?", "order": 1}]},
                {"clause_no": "8.4", "title": "Hazard analysis", "questions": [
                    {"id": "q_fssc_8_4_1", "question_text": "Is hazard analysis conducted covering all inputs?", "order": 1}]},
                {"clause_no": "8.5", "title": "PRPs and CCPs monitoring", "questions": [
                    {"id": "q_fssc_8_5_1", "question_text": "Are operational PRPs and CCPs monitored?", "order": 1}]},
                {"clause_no": "8.6", "title": "Verification of hazard control", "questions": [
                    {"id": "q_fssc_8_6_1", "question_text": "Are verification procedures in place for filters, UV, and RO?", "order": 1}]},
                {"clause_no": "9.1", "title": "Monitoring and measurement", "questions": [
                    {"id": "q_fssc_9_1_1", "question_text": "Are monitoring results reviewed for FSMS performance?", "order": 1}]},
                {"clause_no": "9.2", "title": "Internal audit", "questions": [
                    {"id": "q_fssc_9_2_1", "question_text": "Are internal audits conducted and corrective actions implemented?", "order": 1}]},
                {"clause_no": "9.3", "title": "Management review", "questions": [
                    {"id": "q_fssc_9_3_1", "question_text": "Does management review cover all FSMS inputs and outputs?", "order": 1}]},
                {"clause_no": "10.1", "title": "Nonconformity and corrective action", "questions": [
                    {"id": "q_fssc_10_1_1", "question_text": "Are nonconformities addressed and root causes analyzed?", "order": 1}]},
                {"clause_no": "10.2", "title": "Continual improvement", "questions": [
                    {"id": "q_fssc_10_2_1", "question_text": "Is continual improvement evident in FSMS performance?", "order": 1}]}
            ]},
            {"clause_no": "ISO/TS 22002-1", "title": "Prerequisite Programs (PRPs)", "subclauses": [
                {"clause_no": "4.1", "title": "Facility location", "questions": [
                    {"id": "q_fssc_prp_4_1_1", "question_text": "Is the facility located away from contamination sources?", "order": 1}]},
                {"clause_no": "4.2", "title": "Building design", "questions": [
                    {"id": "q_fssc_prp_4_2_1", "question_text": "Are structures designed to prevent cross-contamination?", "order": 1}]},
                {"clause_no": "4.3", "title": "Utilities", "questions": [
                    {"id": "q_fssc_prp_4_3_1", "question_text": "Are process water, compressed air, and steam tested?", "order": 1}]},
                {"clause_no": "4.4", "title": "Waste management", "questions": [
                    {"id": "q_fssc_prp_4_4_1", "question_text": "Is waste managed effectively?", "order": 1}]},
                {"clause_no": "4.5", "title": "Equipment suitability", "questions": [
                    {"id": "q_fssc_prp_4_5_1", "question_text": "Is equipment made of food-grade materials?", "order": 1}]},
                {"clause_no": "4.6", "title": "Cleaning and sanitation", "questions": [
                    {"id": "q_fssc_prp_4_6_1", "question_text": "Are validated cleaning programs in place?", "order": 1}]},
                {"clause_no": "4.7", "title": "Personnel hygiene", "questions": [
                    {"id": "q_fssc_prp_4_7_1", "question_text": "Are adequate hygiene facilities provided?", "order": 1}]}
            ]}
        ]
    }
