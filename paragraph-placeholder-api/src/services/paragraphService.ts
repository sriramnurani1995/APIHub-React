export const generateParagraphs = (type: string, length: string, count: number): string[] => {
    const textLibrary: Record<string, string[]> = {
        lorem: [
            "Lorem ipsum dolor sit amet", "consectetur adipiscing elit", 
            "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
            "Ut enim ad minim veniam", "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
            "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur"
        ],
        cat: [
            "rub against legs for attention", "knock over a plant", "play with dangling string",
            "stare at birds", "jump on countertop", "scratch furniture", 
            "nap in the sun", "climb curtains", "chase laser dot",
            "sleep in cardboard box", "bring dead mouse as a gift", 
            "attack invisible prey", "hide under the bed", "stare at wall for no reason",
            "purr meow", "drink water from the faucet"
        ],
        pup: [
            "bark at the mailman", "chase squirrels", "play fetch",
            "wag tail", "dig holes", "sniff hydrants", "chew on bones",
            "roll in the grass", "pant happily", "jump in puddles",
            "beg for treats", "run in circles", "howl at sirens"
        ],
        business: [
            "synergize core competencies", "leverage key deliverables", 
            "drive innovation", "scale vertical markets", "engage stakeholders", 
            "optimize operational efficiencies", "empower team collaboration", 
            "maximize ROI", "pivot strategy", "disrupt traditional paradigms"
        ],
        tech: [
            "implement RESTful APIs", "build scalable microservices", 
            "leverage cloud computing", "optimize for mobile-first design", 
            "integrate CI/CD pipelines", "deploy on Kubernetes", "debug production issues",
            "write efficient algorithms", "scale distributed systems", "embrace open-source software"
        ],
        hipster: [
            "sip artisanal coffee", "ride a fixie bike", "wear vintage flannel",
            "shop at farmers markets", "brew craft beer", "grow an urban garden",
            "listen to indie vinyls", "use a typewriter", "attend pop-up galleries",
            "advocate for slow food", "explore hidden speakeasies", "buy fair-trade avocado toast"
        ]
    };

    const wordCounts: Record<string, number> = { short: 40, medium: 100, long: 200 };
    const wordCount = wordCounts[length] || wordCounts['medium'];
    const library = textLibrary[type] || textLibrary['lorem'];

    const paragraphs: string[] = [];
    for (let i = 0; i < count; i++) {
        let paragraph = '';
        let sentence = '';
        let wordCounter = 0;

        while (paragraph.split(' ').length < wordCount) {
            const phrase = library[Math.floor(Math.random() * library.length)];

            // Add the phrase to the sentence
            sentence += sentence ? ` ${phrase}` : phrase;
            wordCounter += phrase.split(' ').length;

            // If the sentence has 8-12 words, close it with a period
            if (wordCounter >= 8 && Math.random() > 0.5) {
                sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
                paragraph += paragraph ? ` ${sentence}` : sentence;
                sentence = '';
                wordCounter = 0;
            }
        }

        // Add any leftover sentence to the paragraph
        if (sentence) {
            sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
            paragraph += ` ${sentence}`;
        }

        paragraphs.push(paragraph.trim());
    }

    return paragraphs;
};
