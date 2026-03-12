const mockQuestions = {
  physics: [
{
  "id": "p1",
  "question": "A body moving with constant velocity has:",
  "options": ["Zero acceleration", "Increasing acceleration", "Decreasing acceleration", "Infinite acceleration"],
  "correct": 0,
  "explanation": "Constant velocity means no change in velocity, therefore acceleration is zero."
},
{
  "id": "p2",
  "question": "The unit of force in SI system is:",
  "options": ["Joule", "Newton", "Watt", "Pascal"],
  "correct": 1,
  "explanation": "Force is measured in Newton (N) in the SI system."
},
{
  "id": "p3",
  "question": "Work done is maximum when angle between force and displacement is:",
  "options": ["0°", "45°", "90°", "180°"],
  "correct": 0,
  "explanation": "Work = Fd cosθ, maximum when cosθ = 1, i.e., θ = 0°."
},
{
  "id": "p4",
  "question": "The dimensional formula of momentum is:",
  "options": ["MLT⁻¹", "ML²T⁻²", "ML²T⁻¹", "MLT⁻²"],
  "correct": 0,
  "explanation": "Momentum = mass × velocity = M × LT⁻¹ = MLT⁻¹."
},
{
  "id": "p5",
  "question": "The acceleration due to gravity on Earth is approximately:",
  "options": ["8.9 m/s²", "9.8 m/s²", "10.8 m/s²", "12 m/s²"],
  "correct": 1,
  "explanation": "Average value of gravitational acceleration on Earth is 9.8 m/s²."
},
{
  "id": "p6",
  "question": "Kinetic energy depends on:",
  "options": ["Velocity", "Mass", "Both mass and velocity", "Distance"],
  "correct": 2,
  "explanation": "KE = 1/2 mv², depends on both mass and velocity."
},
{
  "id": "p7",
  "question": "Which law explains action and reaction?",
  "options": ["Newton's First Law", "Newton's Second Law", "Newton's Third Law", "Law of Gravitation"],
  "correct": 2,
  "explanation": "Newton's Third Law states every action has equal and opposite reaction."
},
{
  "id": "p8",
  "question": "The escape velocity of Earth is approximately:",
  "options": ["7.9 km/s", "9.8 km/s", "11.2 km/s", "13.5 km/s"],
  "correct": 2,
  "explanation": "Escape velocity from Earth's surface is about 11.2 km/s."
},
{
  "id": "p9",
  "question": "Pressure is defined as:",
  "options": ["Force × Area", "Force / Area", "Area / Force", "Mass × Force"],
  "correct": 1,
  "explanation": "Pressure = Force / Area."
},
{
  "id": "p10",
  "question": "The SI unit of power is:",
  "options": ["Watt", "Joule", "Newton", "Volt"],
  "correct": 0,
  "explanation": "Power is measured in Watt (Joule per second)."
},
{
  "id": "p11",
  "question": "Temperature is a measure of:",
  "options": ["Total energy", "Average kinetic energy", "Potential energy", "Mass energy"],
  "correct": 1,
  "explanation": "Temperature measures average kinetic energy of molecules."
},
{
  "id": "p12",
  "question": "Absolute zero temperature equals:",
  "options": ["0°C", "-273°C", "100°C", "-100°C"],
  "correct": 1,
  "explanation": "Absolute zero is −273°C (0 Kelvin)."
},
{
  "id": "p13",
  "question": "The SI unit of heat is:",
  "options": ["Joule", "Calorie", "Kelvin", "Watt"],
  "correct": 0,
  "explanation": "Heat is a form of energy and measured in Joules."
},
{
  "id": "p14",
  "question": "Which process occurs at constant temperature?",
  "options": ["Adiabatic", "Isothermal", "Isochoric", "Isobaric"],
  "correct": 1,
  "explanation": "Isothermal process occurs at constant temperature."
},
{
  "id": "p15",
  "question": "The SI unit of electric charge is:",
  "options": ["Volt", "Ampere", "Coulomb", "Ohm"],
  "correct": 2,
  "explanation": "Electric charge is measured in Coulomb."
},
{
  "id": "p16",
  "question": "Coulomb's law deals with:",
  "options": ["Magnetic force", "Electric force between charges", "Gravitational force", "Nuclear force"],
  "correct": 1,
  "explanation": "Coulomb's law describes force between two charges."
},
{
  "id": "p17",
  "question": "The SI unit of electric field is:",
  "options": ["N/C", "C/N", "Volt", "Ohm"],
  "correct": 0,
  "explanation": "Electric field is force per unit charge (N/C)."
},
{
  "id": "p18",
  "question": "Electric potential difference is measured in:",
  "options": ["Ampere", "Volt", "Ohm", "Coulomb"],
  "correct": 1,
  "explanation": "Potential difference unit is Volt."
},
{
  "id": "p19",
  "question": "The SI unit of magnetic field is:",
  "options": ["Tesla", "Weber", "Gauss", "Henry"],
  "correct": 0,
  "explanation": "Magnetic field strength is measured in Tesla."
},
{
  "id": "p20",
  "question": "A moving charge produces:",
  "options": ["Electric field only", "Magnetic field only", "Both electric and magnetic field", "No field"],
  "correct": 2,
  "explanation": "Moving charges create magnetic fields."
},
{
  "id": "p21",
  "question": "The force on a current carrying conductor in magnetic field is given by:",
  "options": ["Ohm's law", "Lorentz force", "Ampere law", "Faraday law"],
  "correct": 1,
  "explanation": "Lorentz force describes force on moving charge/current."
},
{
  "id": "p22",
  "question": "Electromagnetic induction was discovered by:",
  "options": ["Newton", "Faraday", "Tesla", "Einstein"],
  "correct": 1,
  "explanation": "Michael Faraday discovered electromagnetic induction."
},
{
  "id": "p23",
  "question": "The SI unit of inductance is:",
  "options": ["Henry", "Tesla", "Volt", "Weber"],
  "correct": 0,
  "explanation": "Inductance unit is Henry."
},
{
  "id": "p24",
  "question": "Speed of light in vacuum is:",
  "options": ["3×10⁸ m/s", "3×10⁶ m/s", "3×10⁵ m/s", "3×10⁷ m/s"],
  "correct": 0,
  "explanation": "Speed of light in vacuum is 3×10⁸ m/s."
},
{
  "id": "p25",
  "question": "Refraction occurs due to:",
  "options": ["Change in speed of light", "Change in frequency", "Change in wavelength only", "None"],
  "correct": 0,
  "explanation": "Refraction happens because light speed changes in different media."
},
{
  "id": "p26",
  "question": "The unit of focal length is:",
  "options": ["Meter", "Watt", "Volt", "Second"],
  "correct": 0,
  "explanation": "Focal length is a length measurement."
},
{
  "id": "p27",
  "question": "Total internal reflection occurs when:",
  "options": ["Light goes from dense to rarer medium", "Rarer to denser", "Any medium", "Vacuum"],
  "correct": 0,
  "explanation": "Occurs when light travels from denser to rarer medium at angle greater than critical angle."
},
{
  "id": "p28",
  "question": "The SI unit of frequency is:",
  "options": ["Hertz", "Second", "Meter", "Newton"],
  "correct": 0,
  "explanation": "Frequency is measured in Hertz."
},
{
  "id": "p29",
  "question": "Sound waves are:",
  "options": ["Electromagnetic", "Longitudinal", "Transverse", "Stationary"],
  "correct": 1,
  "explanation": "Sound waves travel as longitudinal waves."
},
{
  "id": "p30",
  "question": "The speed of sound in air is approximately:",
  "options": ["330 m/s", "150 m/s", "600 m/s", "100 m/s"],
  "correct": 0,
  "explanation": "Speed of sound in air at room temperature is about 330 m/s."
},
{
  "id": "p31",
  "question": "The photoelectric effect was explained by:",
  "options": ["Newton", "Einstein", "Bohr", "Maxwell"],
  "correct": 1,
  "explanation": "Einstein explained the photoelectric effect."
},
{
  "id": "p32",
  "question": "Planck's constant value is approximately:",
  "options": ["6.63×10⁻³⁴ Js", "6.63×10⁻³² Js", "6.63×10⁻³⁰ Js", "6.63×10⁻³⁶ Js"],
  "correct": 0,
  "explanation": "Planck's constant ≈ 6.63×10⁻³⁴ Js."
},
{
  "id": "p33",
  "question": "Electron was discovered by:",
  "options": ["Rutherford", "Thomson", "Bohr", "Chadwick"],
  "correct": 1,
  "explanation": "J.J. Thomson discovered the electron."
},
{
  "id": "p34",
  "question": "Proton was discovered by:",
  "options": ["Rutherford", "Thomson", "Bohr", "Einstein"],
  "correct": 0,
  "explanation": "Ernest Rutherford discovered the proton."
},
{
  "id": "p35",
  "question": "Neutron was discovered by:",
  "options": ["Bohr", "Chadwick", "Rutherford", "Planck"],
  "correct": 1,
  "explanation": "James Chadwick discovered the neutron."
},
{
  "id": "p36",
  "question": "The energy of photon is given by:",
  "options": ["E=mc²", "E=hf", "E=mv²", "E=Fq"],
  "correct": 1,
  "explanation": "Photon energy equation is E = hf."
},
{
  "id": "p37",
  "question": "Wave optics explains:",
  "options": ["Reflection", "Refraction", "Interference", "All of these"],
  "correct": 3,
  "explanation": "Wave optics explains reflection, refraction and interference."
},
{
  "id": "p38",
  "question": "Interference of light proves:",
  "options": ["Particle nature", "Wave nature", "Magnetic nature", "Electric nature"],
  "correct": 1,
  "explanation": "Interference demonstrates wave nature of light."
},
{
  "id": "p39",
  "question": "The SI unit of capacitance is:",
  "options": ["Farad", "Henry", "Volt", "Ohm"],
  "correct": 0,
  "explanation": "Capacitance is measured in Farads."
},
{
  "id": "p40",
  "question": "Ohm's law states:",
  "options": ["V = IR", "I = VR", "R = VI", "V = I/R"],
  "correct": 0,
  "explanation": "Ohm's law: Voltage = Current × Resistance."
},
{
  "id": "p41",
  "question": "Which device converts AC to DC?",
  "options": ["Transformer", "Rectifier", "Inductor", "Generator"],
  "correct": 1,
  "explanation": "Rectifier converts AC to DC."
},
{
  "id": "p42",
  "question": "Transformer works on principle of:",
  "options": ["Electromagnetic induction", "Ohm's law", "Coulomb law", "Kirchhoff law"],
  "correct": 0,
  "explanation": "Transformer operates using electromagnetic induction."
},
{
  "id": "p43",
  "question": "The SI unit of resistance is:",
  "options": ["Volt", "Ohm", "Ampere", "Watt"],
  "correct": 1,
  "explanation": "Resistance is measured in Ohm."
},
{
  "id": "p44",
  "question": "Which radiation has highest frequency?",
  "options": ["Radio", "Infrared", "X-rays", "Gamma rays"],
  "correct": 3,
  "explanation": "Gamma rays have highest frequency in EM spectrum."
},
{
  "id": "p45",
  "question": "The dual nature of matter was proposed by:",
  "options": ["Bohr", "Einstein", "De Broglie", "Newton"],
  "correct": 2,
  "explanation": "De Broglie proposed wave nature of matter."
},
{
  "id": "p46",
  "question": "The SI unit of wavelength is:",
  "options": ["Meter", "Second", "Hertz", "Tesla"],
  "correct": 0,
  "explanation": "Wavelength is a length measurement."
},
{
  "id": "p47",
  "question": "The phenomenon responsible for blue sky is:",
  "options": ["Reflection", "Refraction", "Scattering", "Diffraction"],
  "correct": 2,
  "explanation": "Rayleigh scattering makes the sky appear blue."
},
{
  "id": "p48",
  "question": "The frequency of AC in India is:",
  "options": ["60 Hz", "50 Hz", "40 Hz", "100 Hz"],
  "correct": 1,
  "explanation": "Standard AC frequency in India is 50 Hz."
},
{
  "id": "p49",
  "question": "Which mirror is used in headlights?",
  "options": ["Plane mirror", "Convex mirror", "Concave mirror", "None"],
  "correct": 2,
  "explanation": "Concave mirrors focus light into parallel beams."
},
{
  "id": "p50",
  "question": "Nuclear fission occurs in:",
  "options": ["Nuclear reactor", "Battery", "Transformer", "Capacitor"],
  "correct": 0,
  "explanation": "Controlled nuclear fission occurs in nuclear reactors."
}
],
  chemistry:[
{
  "id": "c1",
  "question": "The hybridization of carbon in methane (CH4) is:",
  "options": ["sp", "sp2", "sp3", "sp3d"],
  "correct": 2,
  "explanation": "Carbon forms four sigma bonds in methane, giving it sp3 hybridization."
},
{
  "id": "c2",
  "question": "Which functional group is present in alcohols?",
  "options": ["-CHO", "-COOH", "-OH", "-NH2"],
  "correct": 2,
  "explanation": "Alcohols contain the hydroxyl (-OH) functional group."
},
{
  "id": "c3",
  "question": "Which of the following is an alkane?",
  "options": ["Ethene", "Ethyne", "Ethane", "Benzene"],
  "correct": 2,
  "explanation": "Ethane is a saturated hydrocarbon with only single bonds."
},
{
  "id": "c4",
  "question": "The general formula of alkenes is:",
  "options": ["CnH2n+2", "CnH2n", "CnH2n-2", "CnHn"],
  "correct": 1,
  "explanation": "Alkenes contain one double bond and follow the formula CnH2n."
},
{
  "id": "c5",
  "question": "Which reaction converts alkene to alcohol?",
  "options": ["Hydrogenation", "Hydration", "Oxidation", "Reduction"],
  "correct": 1,
  "explanation": "Hydration adds water across the double bond forming alcohol."
},
{
  "id": "c6",
  "question": "Benzene shows:",
  "options": ["Addition reactions", "Substitution reactions", "Oxidation only", "Reduction only"],
  "correct": 1,
  "explanation": "Benzene mainly undergoes electrophilic substitution reactions."
},
{
  "id": "c7",
  "question": "Which compound is a ketone?",
  "options": ["Propanal", "Propanone", "Propanol", "Propanoic acid"],
  "correct": 1,
  "explanation": "Propanone contains a carbonyl group between two carbons."
},
{
  "id": "c8",
  "question": "Which functional group is present in carboxylic acids?",
  "options": ["-COOH", "-OH", "-CHO", "-CO-"],
  "correct": 0,
  "explanation": "Carboxylic acids contain the carboxyl (-COOH) group."
},
{
  "id": "c9",
  "question": "The IUPAC name of CH3COOH is:",
  "options": ["Methanoic acid", "Ethanoic acid", "Propanoic acid", "Butanoic acid"],
  "correct": 1,
  "explanation": "CH3COOH is ethanoic acid."
},
{
  "id": "c10",
  "question": "Which compound gives iodoform test?",
  "options": ["Methanol", "Ethanol", "Propanol", "Butanol"],
  "correct": 1,
  "explanation": "Ethanol forms iodoform due to CH3CO group formation."
},
{
  "id": "c11",
  "question": "Which gas is known as laughing gas?",
  "options": ["NO", "N2O", "NO2", "N2"],
  "correct": 1,
  "explanation": "Nitrous oxide (N2O) is called laughing gas."
},
{
  "id": "c12",
  "question": "The most electronegative element is:",
  "options": ["Oxygen", "Chlorine", "Fluorine", "Nitrogen"],
  "correct": 2,
  "explanation": "Fluorine has the highest electronegativity."
},
{
  "id": "c13",
  "question": "Which element belongs to the alkali metals?",
  "options": ["Calcium", "Sodium", "Aluminum", "Magnesium"],
  "correct": 1,
  "explanation": "Sodium is a Group 1 alkali metal."
},
{
  "id": "c14",
  "question": "The oxidation state of oxygen in H2O2 is:",
  "options": ["-1", "-2", "+1", "0"],
  "correct": 0,
  "explanation": "In peroxides oxygen has oxidation state −1."
},
{
  "id": "c15",
  "question": "Which metal is liquid at room temperature?",
  "options": ["Mercury", "Sodium", "Aluminum", "Iron"],
  "correct": 0,
  "explanation": "Mercury is the only liquid metal at room temperature."
},
{
  "id": "c16",
  "question": "Which gas is used in Haber process?",
  "options": ["CO2", "N2", "O2", "Cl2"],
  "correct": 1,
  "explanation": "Nitrogen reacts with hydrogen to produce ammonia."
},
{
  "id": "c17",
  "question": "The formula of bleaching powder is:",
  "options": ["CaOCl2", "CaCl2", "NaCl", "NaClO"],
  "correct": 0,
  "explanation": "Bleaching powder chemical formula is CaOCl2."
},
{
  "id": "c18",
  "question": "Which element is a noble gas?",
  "options": ["Argon", "Nitrogen", "Chlorine", "Oxygen"],
  "correct": 0,
  "explanation": "Argon belongs to Group 18 noble gases."
},
{
  "id": "c19",
  "question": "The hardest natural substance is:",
  "options": ["Graphite", "Diamond", "Gold", "Iron"],
  "correct": 1,
  "explanation": "Diamond has a strong 3D covalent network."
},
{
  "id": "c20",
  "question": "Which compound is known as quicklime?",
  "options": ["CaO", "CaCO3", "Ca(OH)2", "MgO"],
  "correct": 0,
  "explanation": "Calcium oxide (CaO) is quicklime."
},
{
  "id": "c21",
  "question": "The SI unit of concentration is:",
  "options": ["mol/L", "mol/m3", "g/L", "ppm"],
  "correct": 1,
  "explanation": "The SI unit for concentration is mol per cubic meter."
},
{
  "id": "c22",
  "question": "Avogadro number is:",
  "options": ["6.022×10^23", "3.011×10^23", "9.11×10^31", "1.6×10^-19"],
  "correct": 0,
  "explanation": "One mole contains 6.022×10^23 particles."
},
{
  "id": "c23",
  "question": "pH of pure water is:",
  "options": ["5", "6", "7", "8"],
  "correct": 2,
  "explanation": "Pure water is neutral with pH 7."
},
{
  "id": "c24",
  "question": "Which law states PV = constant at constant temperature?",
  "options": ["Charles law", "Boyle law", "Avogadro law", "Dalton law"],
  "correct": 1,
  "explanation": "Boyle's law states pressure inversely proportional to volume."
},
{
  "id": "c25",
  "question": "Which process absorbs heat?",
  "options": ["Exothermic", "Endothermic", "Neutral", "None"],
  "correct": 1,
  "explanation": "Endothermic reactions absorb heat."
},
{
  "id": "c26",
  "question": "Catalyst works by:",
  "options": ["Increasing activation energy", "Decreasing activation energy", "Changing equilibrium", "Increasing temperature"],
  "correct": 1,
  "explanation": "Catalysts lower activation energy."
},
{
  "id": "c27",
  "question": "Which gas law relates volume and temperature?",
  "options": ["Boyle law", "Charles law", "Dalton law", "Henry law"],
  "correct": 1,
  "explanation": "Charles law states V ∝ T at constant pressure."
},
{
  "id": "c28",
  "question": "The unit of rate constant for first order reaction is:",
  "options": ["s^-1", "mol/L", "L/mol", "mol/s"],
  "correct": 0,
  "explanation": "First order rate constant has unit s^-1."
},
{
  "id": "c29",
  "question": "Which solution has highest boiling point?",
  "options": ["Pure water", "Salt solution", "Sugar solution", "Alcohol"],
  "correct": 1,
  "explanation": "Salt solution increases boiling point due to colligative properties."
},
{
  "id": "c30",
  "question": "Electrolysis involves:",
  "options": ["Chemical energy", "Electrical energy", "Thermal energy", "Mechanical energy"],
  "correct": 1,
  "explanation": "Electrolysis uses electrical energy to drive chemical reactions."
},
{
  "id": "c31",
  "question": "Molarity is defined as:",
  "options": ["Moles per liter of solution", "Moles per kg solvent", "Mass per liter", "Atoms per mole"],
  "correct": 0,
  "explanation": "Molarity = moles of solute per liter of solution."
},
{
  "id": "c32",
  "question": "Which property depends on number of particles?",
  "options": ["Colligative property", "Chemical property", "Physical property", "Atomic property"],
  "correct": 0,
  "explanation": "Colligative properties depend on particle number."
},
{
  "id": "c33",
  "question": "Which electrode attracts anions?",
  "options": ["Cathode", "Anode", "Salt bridge", "Electrolyte"],
  "correct": 1,
  "explanation": "Anode is positively charged attracting anions."
},
{
  "id": "c34",
  "question": "The standard electrode potential is measured in:",
  "options": ["Ampere", "Volt", "Ohm", "Joule"],
  "correct": 1,
  "explanation": "Electrode potential unit is Volt."
},
{
  "id": "c35",
  "question": "Which factor increases reaction rate?",
  "options": ["Lower temperature", "Higher temperature", "Less catalyst", "Lower concentration"],
  "correct": 1,
  "explanation": "Higher temperature increases kinetic energy of molecules."
},
{
  "id": "c36",
  "question": "The SI unit of entropy is:",
  "options": ["J/K", "J", "K", "mol/K"],
  "correct": 0,
  "explanation": "Entropy unit is Joule per Kelvin."
},
{
  "id": "c37",
  "question": "Gibbs free energy equation is:",
  "options": ["G = H − TS", "G = H + TS", "G = TS − H", "G = H/T"],
  "correct": 0,
  "explanation": "ΔG = ΔH − TΔS determines spontaneity."
},
{
  "id": "c38",
  "question": "If ΔG is negative, reaction is:",
  "options": ["Spontaneous", "Non-spontaneous", "Equilibrium", "Slow"],
  "correct": 0,
  "explanation": "Negative Gibbs free energy means spontaneous reaction."
},
{
  "id": "c39",
  "question": "pOH + pH equals:",
  "options": ["7", "10", "14", "1"],
  "correct": 2,
  "explanation": "At 25°C, pH + pOH = 14."
},
{
  "id": "c40",
  "question": "Which property lowers freezing point?",
  "options": ["Boiling point elevation", "Freezing point depression", "Osmosis", "Diffusion"],
  "correct": 1,
  "explanation": "Solutes lower freezing point of solvent."
},
{
  "id": "c41",
  "question": "The ideal gas equation is:",
  "options": ["PV = nRT", "P = nRT", "V = nRT", "PV = RT"],
  "correct": 0,
  "explanation": "Ideal gas law relates pressure, volume, temperature."
},
{
  "id": "c42",
  "question": "Which factor does NOT affect equilibrium?",
  "options": ["Pressure", "Temperature", "Catalyst", "Concentration"],
  "correct": 2,
  "explanation": "Catalyst speeds reaction but does not shift equilibrium."
},
{
  "id": "c43",
  "question": "Le Chatelier's principle predicts:",
  "options": ["Reaction rate", "Equilibrium shift", "Molecular weight", "Heat capacity"],
  "correct": 1,
  "explanation": "It predicts shift in equilibrium when conditions change."
},
{
  "id": "c44",
  "question": "The SI unit of pressure is:",
  "options": ["Pascal", "Bar", "atm", "Torr"],
  "correct": 0,
  "explanation": "Pressure SI unit is Pascal."
},
{
  "id": "c45",
  "question": "Which type of bond involves electron transfer?",
  "options": ["Covalent", "Ionic", "Hydrogen", "Van der Waals"],
  "correct": 1,
  "explanation": "Ionic bonds form via electron transfer."
},
{
  "id": "c46",
  "question": "Which compound has hydrogen bonding?",
  "options": ["H2O", "CO2", "CH4", "HCl"],
  "correct": 0,
  "explanation": "Water molecules show strong hydrogen bonding."
},
{
  "id": "c47",
  "question": "Which type of bond shares electrons?",
  "options": ["Ionic", "Covalent", "Metallic", "Hydrogen"],
  "correct": 1,
  "explanation": "Covalent bonds involve sharing of electrons."
},
{
  "id": "c48",
  "question": "Which element has highest ionization energy?",
  "options": ["Helium", "Lithium", "Oxygen", "Carbon"],
  "correct": 0,
  "explanation": "Helium has the highest ionization energy."
},
{
  "id": "c49",
  "question": "Which type of solid conducts electricity?",
  "options": ["Ionic solid", "Molecular solid", "Metallic solid", "Covalent solid"],
  "correct": 2,
  "explanation": "Metallic solids conduct electricity due to free electrons."
},
{
  "id": "c50",
  "question": "The unit of molar mass is:",
  "options": ["g/mol", "kg", "mol/L", "g/L"],
  "correct": 0,
  "explanation": "Molar mass is expressed in grams per mole."
}
],
  biology: [
{
  "id": "b1",
  "question": "Which cell organelle is known as the powerhouse of the cell?",
  "options": ["Nucleus", "Mitochondria", "Ribosome", "Golgi apparatus"],
  "correct": 1,
  "explanation": "Mitochondria generate ATP through cellular respiration, providing energy for the cell."
},
{
  "id": "b2",
  "question": "The basic unit of life is:",
  "options": ["Tissue", "Cell", "Organ", "Organ system"],
  "correct": 1,
  "explanation": "The cell is the smallest structural and functional unit of life."
},
{
  "id": "b3",
  "question": "Which organelle is responsible for protein synthesis?",
  "options": ["Ribosome", "Mitochondria", "Chloroplast", "Lysosome"],
  "correct": 0,
  "explanation": "Ribosomes synthesize proteins by translating mRNA."
},
{
  "id": "b4",
  "question": "Which pigment is responsible for photosynthesis?",
  "options": ["Carotene", "Chlorophyll", "Xanthophyll", "Anthocyanin"],
  "correct": 1,
  "explanation": "Chlorophyll absorbs light energy required for photosynthesis."
},
{
  "id": "b5",
  "question": "The site of photosynthesis in plant cells is:",
  "options": ["Mitochondria", "Nucleus", "Chloroplast", "Vacuole"],
  "correct": 2,
  "explanation": "Photosynthesis occurs in chloroplasts which contain chlorophyll."
},
{
  "id": "b6",
  "question": "Which tissue transports water in plants?",
  "options": ["Phloem", "Xylem", "Cambium", "Epidermis"],
  "correct": 1,
  "explanation": "Xylem transports water and minerals from roots to other plant parts."
},
{
  "id": "b7",
  "question": "Which tissue transports food in plants?",
  "options": ["Xylem", "Phloem", "Meristem", "Cortex"],
  "correct": 1,
  "explanation": "Phloem transports food produced in leaves to other parts."
},
{
  "id": "b8",
  "question": "The opening and closing of stomata is controlled by:",
  "options": ["Guard cells", "Epidermal cells", "Mesophyll cells", "Xylem cells"],
  "correct": 0,
  "explanation": "Guard cells regulate stomatal opening and closing."
},
{
  "id": "b9",
  "question": "Which hormone promotes plant growth?",
  "options": ["Auxin", "Ethylene", "Abscisic acid", "Cytokinin"],
  "correct": 0,
  "explanation": "Auxin promotes cell elongation and plant growth."
},
{
  "id": "b10",
  "question": "Which plant hormone causes fruit ripening?",
  "options": ["Auxin", "Gibberellin", "Ethylene", "Cytokinin"],
  "correct": 2,
  "explanation": "Ethylene is responsible for fruit ripening."
},
{
  "id": "b11",
  "question": "The genetic material in most organisms is:",
  "options": ["RNA", "DNA", "Protein", "Carbohydrate"],
  "correct": 1,
  "explanation": "DNA stores and transmits genetic information."
},
{
  "id": "b12",
  "question": "The shape of DNA is:",
  "options": ["Single helix", "Double helix", "Triple helix", "Linear"],
  "correct": 1,
  "explanation": "DNA has a double helix structure."
},
{
  "id": "b13",
  "question": "Who proposed the law of segregation?",
  "options": ["Darwin", "Mendel", "Morgan", "Watson"],
  "correct": 1,
  "explanation": "Gregor Mendel proposed the law of segregation."
},
{
  "id": "b14",
  "question": "Genes are located on:",
  "options": ["Chromosomes", "Ribosomes", "Mitochondria", "Golgi bodies"],
  "correct": 0,
  "explanation": "Genes are segments of DNA located on chromosomes."
},
{
  "id": "b15",
  "question": "The process of copying DNA is called:",
  "options": ["Replication", "Transcription", "Translation", "Mutation"],
  "correct": 0,
  "explanation": "DNA replication produces identical copies of DNA."
},
{
  "id": "b16",
  "question": "RNA is synthesized during:",
  "options": ["Replication", "Transcription", "Translation", "Mutation"],
  "correct": 1,
  "explanation": "Transcription is the synthesis of RNA from DNA."
},
{
  "id": "b17",
  "question": "The genetic code is read in units of:",
  "options": ["Codons", "Genes", "Alleles", "Chromosomes"],
  "correct": 0,
  "explanation": "Codons are triplets of nucleotides coding for amino acids."
},
{
  "id": "b18",
  "question": "Which blood cells carry oxygen?",
  "options": ["RBC", "WBC", "Platelets", "Lymphocytes"],
  "correct": 0,
  "explanation": "Red blood cells contain hemoglobin that carries oxygen."
},
{
  "id": "b19",
  "question": "The human heart has how many chambers?",
  "options": ["2", "3", "4", "5"],
  "correct": 2,
  "explanation": "The human heart has four chambers: two atria and two ventricles."
},
{
  "id": "b20",
  "question": "Which blood vessel carries blood away from the heart?",
  "options": ["Vein", "Artery", "Capillary", "Venule"],
  "correct": 1,
  "explanation": "Arteries carry blood away from the heart."
},
{
  "id": "b21",
  "question": "Which organ purifies blood in humans?",
  "options": ["Kidney", "Heart", "Liver", "Lung"],
  "correct": 0,
  "explanation": "Kidneys filter wastes and excess substances from blood."
},
{
  "id": "b22",
  "question": "The functional unit of kidney is:",
  "options": ["Neuron", "Nephron", "Glomerulus", "Tubule"],
  "correct": 1,
  "explanation": "Nephron is the structural and functional unit of kidney."
},
{
  "id": "b23",
  "question": "Which hormone regulates blood sugar?",
  "options": ["Insulin", "Adrenaline", "Thyroxine", "Growth hormone"],
  "correct": 0,
  "explanation": "Insulin lowers blood glucose levels."
},
{
  "id": "b24",
  "question": "Which gland produces insulin?",
  "options": ["Thyroid", "Pancreas", "Pituitary", "Adrenal"],
  "correct": 1,
  "explanation": "Insulin is secreted by beta cells of pancreas."
},
{
  "id": "b25",
  "question": "Which organ helps in digestion and nutrient absorption?",
  "options": ["Stomach", "Small intestine", "Large intestine", "Liver"],
  "correct": 1,
  "explanation": "Most digestion and absorption occur in the small intestine."
},
{
  "id": "b26",
  "question": "Which enzyme breaks down starch?",
  "options": ["Pepsin", "Amylase", "Lipase", "Trypsin"],
  "correct": 1,
  "explanation": "Amylase breaks starch into sugars."
},
{
  "id": "b27",
  "question": "Which vitamin is produced in skin by sunlight?",
  "options": ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"],
  "correct": 3,
  "explanation": "Vitamin D is synthesized in skin under sunlight."
},
{
  "id": "b28",
  "question": "Which cells defend the body against infection?",
  "options": ["RBC", "WBC", "Platelets", "Neurons"],
  "correct": 1,
  "explanation": "White blood cells fight pathogens."
},
{
  "id": "b29",
  "question": "The basic unit of nervous system is:",
  "options": ["Neuron", "Axon", "Dendrite", "Synapse"],
  "correct": 0,
  "explanation": "Neuron is the structural and functional unit of nervous system."
},
{
  "id": "b30",
  "question": "Which part of brain controls balance?",
  "options": ["Cerebrum", "Cerebellum", "Medulla", "Hypothalamus"],
  "correct": 1,
  "explanation": "Cerebellum coordinates balance and movement."
},
{
  "id": "b31",
  "question": "Which structure connects neuron to neuron?",
  "options": ["Axon", "Synapse", "Dendrite", "Cell body"],
  "correct": 1,
  "explanation": "Synapse is the junction between neurons."
},
{
  "id": "b32",
  "question": "Which blood group is universal donor?",
  "options": ["A", "B", "AB", "O"],
  "correct": 3,
  "explanation": "O negative blood can donate to all groups."
},
{
  "id": "b33",
  "question": "Which blood group is universal recipient?",
  "options": ["A", "B", "AB", "O"],
  "correct": 2,
  "explanation": "AB positive can receive blood from all groups."
},
{
  "id": "b34",
  "question": "The largest cell in human body is:",
  "options": ["Neuron", "Ovum", "Muscle cell", "RBC"],
  "correct": 1,
  "explanation": "The ovum is the largest human cell."
},
{
  "id": "b35",
  "question": "Which organ stores bile?",
  "options": ["Liver", "Gallbladder", "Pancreas", "Stomach"],
  "correct": 1,
  "explanation": "Gallbladder stores bile produced by liver."
},
{
  "id": "b36",
  "question": "Which organ pumps blood?",
  "options": ["Liver", "Kidney", "Heart", "Lung"],
  "correct": 2,
  "explanation": "Heart pumps blood throughout the body."
},
{
  "id": "b37",
  "question": "Which process produces gametes?",
  "options": ["Mitosis", "Meiosis", "Binary fission", "Budding"],
  "correct": 1,
  "explanation": "Meiosis produces haploid gametes."
},
{
  "id": "b38",
  "question": "How many chromosomes in human somatic cells?",
  "options": ["23", "44", "46", "48"],
  "correct": 2,
  "explanation": "Humans have 46 chromosomes in somatic cells."
},
{
  "id": "b39",
  "question": "How many chromosomes in human gametes?",
  "options": ["23", "46", "44", "22"],
  "correct": 0,
  "explanation": "Gametes contain half the chromosome number (23)."
},
{
  "id": "b40",
  "question": "Which part of plant performs photosynthesis?",
  "options": ["Root", "Stem", "Leaf", "Flower"],
  "correct": 2,
  "explanation": "Leaves contain chloroplasts and perform photosynthesis."
},
{
  "id": "b41",
  "question": "Which gas is released during photosynthesis?",
  "options": ["CO2", "O2", "N2", "H2"],
  "correct": 1,
  "explanation": "Oxygen is released during photosynthesis."
},
{
  "id": "b42",
  "question": "Which gas is used in photosynthesis?",
  "options": ["O2", "CO2", "N2", "H2"],
  "correct": 1,
  "explanation": "Carbon dioxide is required for photosynthesis."
},
{
  "id": "b43",
  "question": "Which vitamin helps blood clotting?",
  "options": ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin K"],
  "correct": 3,
  "explanation": "Vitamin K is necessary for blood clotting."
},
{
  "id": "b44",
  "question": "Which mineral is important for hemoglobin?",
  "options": ["Calcium", "Iron", "Sodium", "Potassium"],
  "correct": 1,
  "explanation": "Iron is essential for hemoglobin formation."
},
{
  "id": "b45",
  "question": "Which organ controls body hormones?",
  "options": ["Pituitary gland", "Heart", "Kidney", "Lung"],
  "correct": 0,
  "explanation": "Pituitary is called the master gland."
},
{
  "id": "b46",
  "question": "Which system controls body movements?",
  "options": ["Digestive system", "Nervous system", "Respiratory system", "Circulatory system"],
  "correct": 1,
  "explanation": "The nervous system coordinates body activities."
},
{
  "id": "b47",
  "question": "Which organ exchanges gases in humans?",
  "options": ["Heart", "Lungs", "Kidneys", "Liver"],
  "correct": 1,
  "explanation": "Lungs exchange oxygen and carbon dioxide."
},
{
  "id": "b48",
  "question": "Which muscle works involuntarily?",
  "options": ["Skeletal muscle", "Cardiac muscle", "Voluntary muscle", "Biceps"],
  "correct": 1,
  "explanation": "Cardiac muscles work involuntarily."
},
{
  "id": "b49",
  "question": "Which structure stores genetic information?",
  "options": ["DNA", "Protein", "Carbohydrate", "Lipid"],
  "correct": 0,
  "explanation": "DNA contains genetic instructions."
},
{
  "id": "b50",
  "question": "Which stage of cell division separates sister chromatids?",
  "options": ["Prophase", "Metaphase", "Anaphase", "Telophase"],
  "correct": 2,
  "explanation": "In anaphase, sister chromatids move to opposite poles."
}
]
};

export default mockQuestions;