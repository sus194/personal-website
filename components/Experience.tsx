import React, { useState } from 'react';
import '../styles/experience.css';
import Link from 'next/link';
import { FaArrowCircleUp, FaArrowCircleDown, FaGitlab } from 'react-icons/fa';

interface ExperienceItem {
    company: string;
    role: string;
    date: string;
    details: string[];
    link?: string;
}

const experiences: ExperienceItem[] = [
    {
        company: "Astera Labs",
        role: "Software Developer Intern",
        date: "Jan 2025 - Aug 2025",
        details: [
            "Built a <span class='tech-highlight'>Python</span> RAG tool over internal docs, improving issue triage and onboarding by 30%.",
            "Implemented a <span class='tech-highlight'>C++</span> API layer on the networking SDK for configuring and monitoring devices in large-scale data centers.",
            "Created a test suite in <span class='tech-highlight'>Python</span> and <span class='tech-highlight'>Bash</span> for deepening device logging across memory and network systems, cutting troubleshooting time by 35% with fully traceable logs.",
            "Developed a containerized benchmarking toolbox for memory and networking devices with automated parsing, trend analysis, and live dashboards, improving developer efficiency by 15%.",
            "Collaborated with firmware, platform, and data teams for resolving memory-tiering issues and standardizing reproducible debug workflows for enterprise customers (Meta, Microsoft, AWS)."
        ]
    },
    {
        company: "MineSense Technologies Ltd.",
        role: "Software Engineer Intern",
        date: "Sep 2023 - May 2024",
        details: [
            "Automated <span class='tech-highlight'>Jenkins</span> CI/CD pipelines on an on-prem <span class='tech-highlight'>Kubernetes</span> cluster, cutting deploy time by 30%.",
            "Added <span class='tech-highlight'>Regex-based</span> configuration validation, catching 20% more integration bugs and reducing diagnostic time by 15%.",
            "Expanded <span class='tech-highlight'>Selenium/pytest</span> coverage with automated reports and flaky-test triage, reducing bug volume by 30%.",
            "Partnered with data engineers to align validation datasets with field conditions, increasing model fidelity by 13%."
        ]
    },
    {
        company: "SFU Robotics Soccer Club",
        role: "Software Development Team Lead",
        date: "May 2024 - Present",
        details: [
            "Lead a team of more than twenty developers building networking infrastructure, GUI simulations, and AI agents in <span class='tech-highlight'>C++</span>.",
            "Implemented a D* Lite and Conflict Based Search path planning system for coordinated multi-robot navigation.",
            "Built a physics engine for accurate motion simulation that reduced real-world debugging time by 30%.",
            "Designed real-time network control systems for fast communication and responsiveness during matches."
        ],
        link: "https://gitlab.com/sfurs/software"
    }
];

export default function Experience(props: any) {

    return (
        <div className="experience-container" id="experience-section">
            <h1 className="experience-title">Experience</h1>

            <div className="circuit-board">
                {/* The Central Conductor Line */}
                <div className="circuit-line"></div>

                {experiences.map((exp, index) => (
                    <div key={index} className="exp-node">
                        <h2 className="exp-role">{exp.role}</h2>
                        <h3 className="exp-company">{exp.company}</h3>
                        <p className="exp-date">{exp.date}</p>
                        <ul className="exp-details">
                            {exp.details.map((detail, idx) => (
                                <li key={idx} dangerouslySetInnerHTML={{ __html: detail }}></li>
                            ))}
                        </ul>

                        {/* Repo Link Footer */}
                        {exp.link && (
                            <div className="mt-4 pt-3 border-t border-gray-800 flex items-center gap-2">
                                <span className="text-gray-400 text-sm font-bold uppercase tracking-wider">Repo</span>
                                <a href={exp.link} target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-400 text-xl transition-colors" title="View Repository">
                                    <FaGitlab />
                                </a>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
