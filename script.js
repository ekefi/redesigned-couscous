// CarFinder Pro catalog script

// Utility to lighten a hex color by a percentage
function lighten(color, percent) {
    const num = parseInt(color.replace('#', ''), 16);
    let r = (num >> 16) & 0xFF;
    let g = (num >> 8) & 0xFF;
    let b = num & 0xFF;
    r = Math.min(255, Math.floor(r + (255 - r) * percent / 100));
    g = Math.min(255, Math.floor(g + (255 - g) * percent / 100));
    b = Math.min(255, Math.floor(b + (255 - b) * percent / 100));
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

// Generate an SVG placeholder image and return data URI
function createSVG(color, text) {
    // Determine ideal text color (white or black) based on background brightness
    const c = color.replace('#', '');
    const r = parseInt(c.substring(0, 2), 16);
    const g = parseInt(c.substring(2, 4), 16);
    const b = parseInt(c.substring(4, 6), 16);
    // Relative luminance formula
    const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
    const textColor = brightness > 150 ? '#000000' : '#ffffff';
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='240'><rect width='100%' height='100%' fill='${color}'/><text x='50%' y='50%' font-size='32' font-family='Arial' fill='${textColor}' dominant-baseline='middle' text-anchor='middle'>${text}</text></svg>`;
    return 'data:image/svg+xml;base64,' + btoa(svg);
}

// Generate 4 placeholder images for a car
function generatePlaceholderImages(brand, model, baseColor) {
    const images = [];
    for (let i = 0; i < 4; i++) {
        const colorVariant = lighten(baseColor, i * 15);
        const text = `${brand} ${model}`;
        images.push(createSVG(colorVariant, text));
    }
    return images;
}

// Car dataset: 50 cars with detailed specs
const cars = [
    {
        id: 1,
        brand: 'Audi',
        model: 'A3',
        year: 2023,
        price: 25000,
        km: 15000,
        fuel: 'Petrol',
        transmission: 'Automatic',
        power: 150,
        zeroToHundred: 8.2,
        topSpeed: 210,
        consumption: 5.6,
        label: 'C',
        body: 'Hatchback',
        seats: 5,
        doors: 5,
        color: 'Red',
        location: 'Madrid',
        condition: 'Used',
        warranty: '1 year',
        description: 'Compact, premium and sporty.',
        baseColor: '#e53935'
    },
    {
        id: 2,
        brand: 'Audi',
        model: 'A4',
        year: 2021,
        price: 32000,
        km: 25000,
        fuel: 'Diesel',
        transmission: 'Automatic',
        power: 190,
        zeroToHundred: 7.3,
        topSpeed: 240,
        consumption: 4.5,
        label: 'C',
        body: 'Sedan',
        seats: 5,
        doors: 4,
        color: 'Black',
        location: 'Barcelona',
        condition: 'Used',
        warranty: '1 year',
        description: 'Comfortable and refined family sedan.',
        baseColor: '#1e88e5'
    },
    {
        id: 3,
        brand: 'BMW',
        model: '3 Series',
        year: 2022,
        price: 35000,
        km: 20000,
        fuel: 'Petrol',
        transmission: 'Manual',
        power: 184,
        zeroToHundred: 7.1,
        topSpeed: 235,
        consumption: 6.1,
        label: 'C',
        body: 'Sedan',
        seats: 5,
        doors: 4,
        color: 'Blue',
        location: 'Valencia',
        condition: 'Used',
        warranty: '1 year',
        description: 'Dynamic and efficient with sporty handling.',
        baseColor: '#3949ab'
    },
    {
        id: 4,
        brand: 'BMW',
        model: 'X5',
        year: 2024,
        price: 65000,
        km: 0,
        fuel: 'Diesel',
        transmission: 'Automatic',
        power: 265,
        zeroToHundred: 6.1,
        topSpeed: 243,
        consumption: 7.2,
        label: 'C',
        body: 'SUV',
        seats: 5,
        doors: 5,
        color: 'White',
        location: 'Madrid',
        condition: 'New',
        warranty: '3 years',
        description: 'Luxurious and spacious SUV with high performance.',
        baseColor: '#8e24aa'
    },
    {
        id: 5,
        brand: 'Mercedes',
        model: 'C-Class',
        year: 2023,
        price: 40000,
        km: 18000,
        fuel: 'Petrol',
        transmission: 'Automatic',
        power: 204,
        zeroToHundred: 6.8,
        topSpeed: 250,
        consumption: 5.9,
        label: 'C',
        body: 'Sedan',
        seats: 5,
        doors: 4,
        color: 'Silver',
        location: 'Madrid',
        condition: 'Used',
        warranty: '2 years',
        description: 'Elegant and technologically advanced sedan.',
        baseColor: '#00acc1'
    },
    {
        id: 6,
        brand: 'Mercedes',
        model: 'GLE',
        year: 2022,
        price: 70000,
        km: 22000,
        fuel: 'Diesel',
        transmission: 'Automatic',
        power: 330,
        zeroToHundred: 5.7,
        topSpeed: 250,
        consumption: 8.3,
        label: 'C',
        body: 'SUV',
        seats: 5,
        doors: 5,
        color: 'Black',
        location: 'Barcelona',
        condition: 'Used',
        warranty: '2 years',
        description: 'Large premium SUV with strong performance.',
        baseColor: '#d81b60'
    },
    {
        id: 7,
        brand: 'Tesla',
        model: 'Model S',
        year: 2024,
        price: 90000,
        km: 5000,
        fuel: 'Electric',
        transmission: 'Automatic',
        power: 670,
        zeroToHundred: 3.1,
        topSpeed: 322,
        consumption: 18,
        label: '0',
        body: 'Sedan',
        seats: 5,
        doors: 5,
        color: 'White',
        location: 'Madrid',
        condition: 'Used',
        warranty: '4 years',
        description: 'High-performance electric sedan with cutting-edge tech.',
        baseColor: '#43a047'
    },
    {
        id: 8,
        brand: 'Tesla',
        model: 'Model 3',
        year: 2023,
        price: 45000,
        km: 10000,
        fuel: 'Electric',
        transmission: 'Automatic',
        power: 480,
        zeroToHundred: 4.4,
        topSpeed: 261,
        consumption: 15,
        label: '0',
        body: 'Sedan',
        seats: 5,
        doors: 4,
        color: 'Blue',
        location: 'Valencia',
        condition: 'Used',
        warranty: '4 years',
        description: 'Popular electric sedan with great efficiency.',
        baseColor: '#1e88e5'
    },
    {
        id: 9,
        brand: 'Toyota',
        model: 'Corolla',
        year: 2022,
        price: 22000,
        km: 12000,
        fuel: 'Hybrid',
        transmission: 'Automatic',
        power: 122,
        zeroToHundred: 10.8,
        topSpeed: 180,
        consumption: 4.2,
        label: 'ECO',
        body: 'Hatchback',
        seats: 5,
        doors: 5,
        color: 'White',
        location: 'Seville',
        condition: 'Used',
        warranty: '2 years',
        description: 'Reliable and efficient compact hybrid.',
        baseColor: '#f4511e'
    },
    {
        id: 10,
        brand: 'Toyota',
        model: 'RAV4',
        year: 2021,
        price: 30000,
        km: 30000,
        fuel: 'Hybrid',
        transmission: 'Automatic',
        power: 222,
        zeroToHundred: 8.1,
        topSpeed: 200,
        consumption: 5.0,
        label: 'ECO',
        body: 'SUV',
        seats: 5,
        doors: 5,
        color: 'Silver',
        location: 'Madrid',
        condition: 'Used',
        warranty: '2 years',
        description: 'Spacious hybrid SUV with great reliability.',
        baseColor: '#6d4c41'
    },
    {
        id: 11,
        brand: 'Ford',
        model: 'Focus',
        year: 2020,
        price: 18000,
        km: 40000,
        fuel: 'Petrol',
        transmission: 'Manual',
        power: 125,
        zeroToHundred: 9.6,
        topSpeed: 198,
        consumption: 5.4,
        label: 'C',
        body: 'Hatchback',
        seats: 5,
        doors: 5,
        color: 'Grey',
        location: 'Bilbao',
        condition: 'Used',
        warranty: '1 year',
        description: 'Fun to drive with balanced handling.',
        baseColor: '#5e35b1'
    },
    {
        id: 12,
        brand: 'Ford',
        model: 'Mustang',
        year: 2019,
        price: 38000,
        km: 45000,
        fuel: 'Petrol',
        transmission: 'Manual',
        power: 450,
        zeroToHundred: 4.3,
        topSpeed: 250,
        consumption: 12.0,
        label: 'C',
        body: 'Coupe',
        seats: 4,
        doors: 2,
        color: 'Red',
        location: 'Madrid',
        condition: 'Used',
        warranty: '1 year',
        description: 'Iconic muscle car with thrilling performance.',
        baseColor: '#c62828'
    },
    {
        id: 13,
        brand: 'Honda',
        model: 'Civic',
        year: 2021,
        price: 21000,
        km: 22000,
        fuel: 'Petrol',
        transmission: 'Manual',
        power: 182,
        zeroToHundred: 7.0,
        topSpeed: 220,
        consumption: 5.8,
        label: 'C',
        body: 'Sedan',
        seats: 5,
        doors: 4,
        color: 'Blue',
        location: 'Valencia',
        condition: 'Used',
        warranty: '1 year',
        description: 'Reliable sedan with modern features.',
        baseColor: '#1565c0'
    },
    {
        id: 14,
        brand: 'Honda',
        model: 'Accord',
        year: 2022,
        price: 24000,
        km: 18000,
        fuel: 'Hybrid',
        transmission: 'Automatic',
        power: 212,
        zeroToHundred: 7.6,
        topSpeed: 205,
        consumption: 4.9,
        label: 'ECO',
        body: 'Sedan',
        seats: 5,
        doors: 4,
        color: 'Grey',
        location: 'Barcelona',
        condition: 'Used',
        warranty: '2 years',
        description: 'Comfortable hybrid sedan with good efficiency.',
        baseColor: '#455a64'
    },
    {
        id: 15,
        brand: 'Nissan',
        model: 'Leaf',
        year: 2023,
        price: 27000,
        km: 8000,
        fuel: 'Electric',
        transmission: 'Automatic',
        power: 150,
        zeroToHundred: 7.9,
        topSpeed: 157,
        consumption: 15,
        label: '0',
        body: 'Hatchback',
        seats: 5,
        doors: 5,
        color: 'White',
        location: 'Madrid',
        condition: 'Used',
        warranty: '3 years',
        description: 'Practical electric hatchback with zero emissions.',
        baseColor: '#00bcd4'
    },
    {
        id: 16,
        brand: 'Volkswagen',
        model: 'Golf',
        year: 2021,
        price: 20000,
        km: 28000,
        fuel: 'Diesel',
        transmission: 'Manual',
        power: 150,
        zeroToHundred: 8.6,
        topSpeed: 212,
        consumption: 4.2,
        label: 'C',
        body: 'Hatchback',
        seats: 5,
        doors: 5,
        color: 'Silver',
        location: 'Zaragoza',
        condition: 'Used',
        warranty: '1 year',
        description: 'Versatile and efficient with refined driving manners.',
        baseColor: '#546e7a'
    },
    {
        id: 17,
        brand: 'Hyundai',
        model: 'Tucson',
        year: 2022,
        price: 26000,
        km: 15000,
        fuel: 'Petrol',
        transmission: 'Automatic',
        power: 180,
        zeroToHundred: 9.2,
        topSpeed: 201,
        consumption: 6.9,
        label: 'C',
        body: 'SUV',
        seats: 5,
        doors: 5,
        color: 'Green',
        location: 'Valencia',
        condition: 'Used',
        warranty: '2 years',
        description: 'Modern SUV with stylish design and safety tech.',
        baseColor: '#2e7d32'
    },
    {
        id: 18,
        brand: 'Mazda',
        model: 'CX-5',
        year: 2023,
        price: 28000,
        km: 10000,
        fuel: 'Petrol',
        transmission: 'Automatic',
        power: 194,
        zeroToHundred: 8.7,
        topSpeed: 210,
        consumption: 7.0,
        label: 'C',
        body: 'SUV',
        seats: 5,
        doors: 5,
        color: 'Black',
        location: 'Barcelona',
        condition: 'Used',
        warranty: '2 years',
        description: 'Sharp handling and premium interior.',
        baseColor: '#212121'
    },
    {
        id: 19,
        brand: 'Kia',
        model: 'Sportage',
        year: 2021,
        price: 25000,
        km: 20000,
        fuel: 'Hybrid',
        transmission: 'Automatic',
        power: 180,
        zeroToHundred: 8.8,
        topSpeed: 200,
        consumption: 5.5,
        label: 'ECO',
        body: 'SUV',
        seats: 5,
        doors: 5,
        color: 'White',
        location: 'Madrid',
        condition: 'Used',
        warranty: '2 years',
        description: 'Efficient hybrid crossover with bold styling.',
        baseColor: '#f9a825'
    },
    {
        id: 20,
        brand: 'Porsche',
        model: '911',
        year: 2019,
        price: 95000,
        km: 30000,
        fuel: 'Petrol',
        transmission: 'Automatic',
        power: 450,
        zeroToHundred: 3.5,
        topSpeed: 308,
        consumption: 9.0,
        label: 'C',
        body: 'Coupe',
        seats: 4,
        doors: 2,
        color: 'Yellow',
        location: 'Marbella',
        condition: 'Used',
        warranty: '1 year',
        description: 'Legendary sports car with timeless design.',
        baseColor: '#fdd835'
    },
    {
        id: 21,
        brand: 'Chevrolet',
        model: 'Camaro',
        year: 2018,
        price: 38000,
        km: 50000,
        fuel: 'Petrol',
        transmission: 'Manual',
        power: 455,
        zeroToHundred: 4.0,
        topSpeed: 290,
        consumption: 12.5,
        label: 'C',
        body: 'Coupe',
        seats: 4,
        doors: 2,
        color: 'Blue',
        location: 'Madrid',
        condition: 'Used',
        warranty: '1 year',
        description: 'American muscle car with head-turning looks.',
        baseColor: '#1565c0'
    },
    {
        id: 22,
        brand: 'Jeep',
        model: 'Wrangler',
        year: 2020,
        price: 32000,
        km: 35000,
        fuel: 'Petrol',
        transmission: 'Manual',
        power: 285,
        zeroToHundred: 6.4,
        topSpeed: 180,
        consumption: 10.0,
        label: 'C',
        body: 'SUV',
        seats: 5,
        doors: 4,
        color: 'Green',
        location: 'Malaga',
        condition: 'Used',
        warranty: '1 year',
        description: 'Off-road legend with rugged capabilities.',
        baseColor: '#2e7d32'
    },
    {
        id: 23,
        brand: 'Land Rover',
        model: 'Range Rover',
        year: 2022,
        price: 85000,
        km: 15000,
        fuel: 'Diesel',
        transmission: 'Automatic',
        power: 350,
        zeroToHundred: 5.7,
        topSpeed: 225,
        consumption: 9.6,
        label: 'C',
        body: 'SUV',
        seats: 5,
        doors: 5,
        color: 'Black',
        location: 'Madrid',
        condition: 'Used',
        warranty: '3 years',
        description: 'Luxury SUV with refined comfort and capability.',
        baseColor: '#37474f'
    },
    {
        id: 24,
        brand: 'Jaguar',
        model: 'F-Type',
        year: 2021,
        price: 68000,
        km: 22000,
        fuel: 'Petrol',
        transmission: 'Automatic',
        power: 380,
        zeroToHundred: 4.9,
        topSpeed: 275,
        consumption: 10.5,
        label: 'C',
        body: 'Coupe',
        seats: 2,
        doors: 2,
        color: 'Silver',
        location: 'Valencia',
        condition: 'Used',
        warranty: '2 years',
        description: 'Stylish British sports car with exhilarating performance.',
        baseColor: '#78909c'
    },
    {
        id: 25,
        brand: 'Volvo',
        model: 'XC90',
        year: 2023,
        price: 62000,
        km: 12000,
        fuel: 'Hybrid',
        transmission: 'Automatic',
        power: 340,
        zeroToHundred: 5.8,
        topSpeed: 240,
        consumption: 7.5,
        label: 'ECO',
        body: 'SUV',
        seats: 7,
        doors: 5,
        color: 'Black',
        location: 'Madrid',
        condition: 'Used',
        warranty: '3 years',
        description: 'Premium large SUV with safety and comfort.',
        baseColor: '#263238'
    },
    {
        id: 26,
        brand: 'Renault',
        model: 'Clio',
        year: 2020,
        price: 14000,
        km: 30000,
        fuel: 'Petrol',
        transmission: 'Manual',
        power: 90,
        zeroToHundred: 12.2,
        topSpeed: 180,
        consumption: 5.2,
        label: 'C',
        body: 'Hatchback',
        seats: 5,
        doors: 5,
        color: 'Red',
        location: 'Barcelona',
        condition: 'Used',
        warranty: '1 year',
        description: 'Affordable small car with chic design.',
        baseColor: '#c62828'
    },
    {
        id: 27,
        brand: 'Skoda',
        model: 'Octavia',
        year: 2021,
        price: 19000,
        km: 25000,
        fuel: 'Petrol',
        transmission: 'Manual',
        power: 110,
        zeroToHundred: 10.6,
        topSpeed: 200,
        consumption: 5.6,
        label: 'C',
        body: 'Sedan',
        seats: 5,
        doors: 5,
        color: 'Blue',
        location: 'Madrid',
        condition: 'Used',
        warranty: '2 years',
        description: 'Practical family sedan with huge boot.',
        baseColor: '#1565c0'
    },
    {
        id: 28,
        brand: 'Peugeot',
        model: '208',
        year: 2020,
        price: 15000,
        km: 35000,
        fuel: 'Diesel',
        transmission: 'Manual',
        power: 100,
        zeroToHundred: 11.5,
        topSpeed: 188,
        consumption: 4.0,
        label: 'C',
        body: 'Hatchback',
        seats: 5,
        doors: 5,
        color: 'Yellow',
        location: 'Valencia',
        condition: 'Used',
        warranty: '1 year',
        description: 'Trendy supermini with efficient engine.',
        baseColor: '#fdd835'
    },
    {
        id: 29,
        brand: 'Opel',
        model: 'Astra',
        year: 2021,
        price: 18000,
        km: 22000,
        fuel: 'Petrol',
        transmission: 'Manual',
        power: 130,
        zeroToHundred: 9.9,
        topSpeed: 208,
        consumption: 5.8,
        label: 'C',
        body: 'Hatchback',
        seats: 5,
        doors: 5,
        color: 'Silver',
        location: 'Madrid',
        condition: 'Used',
        warranty: '2 years',
        description: 'Reliable hatchback with comfortable ride.',
        baseColor: '#bdbdbd'
    },
    {
        id: 30,
        brand: 'Citroën',
        model: 'C3',
        year: 2019,
        price: 13000,
        km: 45000,
        fuel: 'Petrol',
        transmission: 'Manual',
        power: 82,
        zeroToHundred: 13.0,
        topSpeed: 168,
        consumption: 5.4,
        label: 'C',
        body: 'Hatchback',
        seats: 5,
        doors: 5,
        color: 'White',
        location: 'Seville',
        condition: 'Used',
        warranty: '1 year',
        description: 'Cheerful small car with funky styling.',
        baseColor: '#ef6c00'
    },
    {
        id: 31,
        brand: 'Alfa Romeo',
        model: 'Giulia',
        year: 2021,
        price: 40000,
        km: 18000,
        fuel: 'Petrol',
        transmission: 'Automatic',
        power: 280,
        zeroToHundred: 5.2,
        topSpeed: 240,
        consumption: 6.8,
        label: 'C',
        body: 'Sedan',
        seats: 5,
        doors: 4,
        color: 'Red',
        location: 'Madrid',
        condition: 'Used',
        warranty: '2 years',
        description: 'Italian sports sedan with passionate performance.',
        baseColor: '#e53935'
    },
    {
        id: 32,
        brand: 'Seat',
        model: 'Leon',
        year: 2022,
        price: 22000,
        km: 20000,
        fuel: 'Petrol',
        transmission: 'Automatic',
        power: 150,
        zeroToHundred: 8.0,
        topSpeed: 215,
        consumption: 5.9,
        label: 'C',
        body: 'Hatchback',
        seats: 5,
        doors: 5,
        color: 'Grey',
        location: 'Zaragoza',
        condition: 'Used',
        warranty: '2 years',
        description: 'Sporty Spanish hatchback with sharp styling.',
        baseColor: '#757575'
    },
    {
        id: 33,
        brand: 'Lexus',
        model: 'UX',
        year: 2021,
        price: 35000,
        km: 18000,
        fuel: 'Hybrid',
        transmission: 'Automatic',
        power: 184,
        zeroToHundred: 8.5,
        topSpeed: 177,
        consumption: 4.7,
        label: 'ECO',
        body: 'SUV',
        seats: 5,
        doors: 5,
        color: 'White',
        location: 'Madrid',
        condition: 'Used',
        warranty: '3 years',
        description: 'Premium compact crossover with hybrid efficiency.',
        baseColor: '#fafafa'
    },
    {
        id: 34,
        brand: 'Subaru',
        model: 'Outback',
        year: 2022,
        price: 33000,
        km: 25000,
        fuel: 'Petrol',
        transmission: 'Automatic',
        power: 182,
        zeroToHundred: 8.8,
        topSpeed: 200,
        consumption: 7.3,
        label: 'C',
        body: 'Wagon',
        seats: 5,
        doors: 5,
        color: 'Green',
        location: 'Bilbao',
        condition: 'Used',
        warranty: '2 years',
        description: 'Rugged wagon with all-wheel drive capability.',
        baseColor: '#4caf50'
    },
    {
        id: 35,
        brand: 'Mitsubishi',
        model: 'Outlander',
        year: 2020,
        price: 28000,
        km: 28000,
        fuel: 'Hybrid',
        transmission: 'Automatic',
        power: 224,
        zeroToHundred: 8.4,
        topSpeed: 170,
        consumption: 5.5,
        label: 'ECO',
        body: 'SUV',
        seats: 7,
        doors: 5,
        color: 'Silver',
        location: 'Valencia',
        condition: 'Used',
        warranty: '2 years',
        description: 'Versatile plug-in hybrid SUV with seven seats.',
        baseColor: '#9e9e9e'
    },
    {
        id: 36,
        brand: 'Suzuki',
        model: 'Swift',
        year: 2019,
        price: 12000,
        km: 40000,
        fuel: 'Petrol',
        transmission: 'Manual',
        power: 90,
        zeroToHundred: 12.0,
        topSpeed: 165,
        consumption: 5.0,
        label: 'C',
        body: 'Hatchback',
        seats: 5,
        doors: 5,
        color: 'Blue',
        location: 'Madrid',
        condition: 'Used',
        warranty: '1 year',
        description: 'Lightweight and nimble city car.',
        baseColor: '#1976d2'
    },
    {
        id: 37,
        brand: 'Fiat',
        model: '500',
        year: 2018,
        price: 10000,
        km: 35000,
        fuel: 'Petrol',
        transmission: 'Manual',
        power: 69,
        zeroToHundred: 13.8,
        topSpeed: 160,
        consumption: 4.5,
        label: 'C',
        body: 'Hatchback',
        seats: 4,
        doors: 3,
        color: 'White',
        location: 'Valencia',
        condition: 'Used',
        warranty: '1 year',
        description: 'Iconic city car with retro charm.',
        baseColor: '#a1887f'
    },
    {
        id: 38,
        brand: 'Mini',
        model: 'Cooper',
        year: 2021,
        price: 22000,
        km: 18000,
        fuel: 'Petrol',
        transmission: 'Automatic',
        power: 136,
        zeroToHundred: 8.2,
        topSpeed: 210,
        consumption: 5.5,
        label: 'C',
        body: 'Hatchback',
        seats: 4,
        doors: 3,
        color: 'Red',
        location: 'Madrid',
        condition: 'Used',
        warranty: '2 years',
        description: 'Stylish small car with go-kart handling.',
        baseColor: '#b71c1c'
    },
    {
        id: 39,
        brand: 'Dacia',
        model: 'Duster',
        year: 2020,
        price: 17000,
        km: 30000,
        fuel: 'Diesel',
        transmission: 'Manual',
        power: 115,
        zeroToHundred: 10.5,
        topSpeed: 180,
        consumption: 4.7,
        label: 'C',
        body: 'SUV',
        seats: 5,
        doors: 5,
        color: 'White',
        location: 'Valencia',
        condition: 'Used',
        warranty: '2 years',
        description: 'Affordable SUV with off-road potential.',
        baseColor: '#8eacbb' // changed from #e0e0e0 to improve contrast
    },
    {
        id: 40,
        brand: 'Bentley',
        model: 'Continental GT',
        year: 2019,
        price: 150000,
        km: 20000,
        fuel: 'Petrol',
        transmission: 'Automatic',
        power: 550,
        zeroToHundred: 3.9,
        topSpeed: 333,
        consumption: 12.4,
        label: 'C',
        body: 'Coupe',
        seats: 4,
        doors: 2,
        color: 'Dark Blue',
        location: 'Barcelona',
        condition: 'Used',
        warranty: '2 years',
        description: 'Ultra-luxury grand tourer with powerful engine.',
        baseColor: '#283593'
    },
    {
        id: 41,
        brand: 'Ferrari',
        model: 'Portofino',
        year: 2020,
        price: 200000,
        km: 10000,
        fuel: 'Petrol',
        transmission: 'Automatic',
        power: 600,
        zeroToHundred: 3.5,
        topSpeed: 320,
        consumption: 11.3,
        label: 'C',
        body: 'Convertible',
        seats: 2,
        doors: 2,
        color: 'Red',
        location: 'Madrid',
        condition: 'Used',
        warranty: '1 year',
        description: 'Open-top supercar delivering Italian passion.',
        baseColor: '#c62828'
    },
    {
        id: 42,
        brand: 'Lamborghini',
        model: 'Huracan',
        year: 2021,
        price: 250000,
        km: 8000,
        fuel: 'Petrol',
        transmission: 'Automatic',
        power: 610,
        zeroToHundred: 2.9,
        topSpeed: 325,
        consumption: 12.7,
        label: 'C',
        body: 'Coupe',
        seats: 2,
        doors: 2,
        color: 'Green',
        location: 'Valencia',
        condition: 'Used',
        warranty: '2 years',
        description: 'Exotic supercar with jaw-dropping looks.',
        baseColor: '#388e3c'
    },
    {
        id: 43,
        brand: 'McLaren',
        model: '720S',
        year: 2022,
        price: 280000,
        km: 5000,
        fuel: 'Petrol',
        transmission: 'Automatic',
        power: 710,
        zeroToHundred: 2.8,
        topSpeed: 341,
        consumption: 10.7,
        label: 'C',
        body: 'Coupe',
        seats: 2,
        doors: 2,
        color: 'Orange',
        location: 'Madrid',
        condition: 'Used',
        warranty: '3 years',
        description: 'Carbon-fibre supercar with blistering speed.',
        baseColor: '#f57c00'
    },
    {
        id: 44,
        brand: 'Rolls-Royce',
        model: 'Phantom',
        year: 2018,
        price: 300000,
        km: 15000,
        fuel: 'Petrol',
        transmission: 'Automatic',
        power: 563,
        zeroToHundred: 5.3,
        topSpeed: 250,
        consumption: 14.1,
        label: 'C',
        body: 'Sedan',
        seats: 5,
        doors: 4,
        color: 'Black',
        location: 'Barcelona',
        condition: 'Used',
        warranty: '2 years',
        description: 'The epitome of luxury and craftsmanship.',
        baseColor: '#424242'
    },
    {
        id: 45,
        brand: 'Bugatti',
        model: 'Chiron',
        year: 2020,
        price: 2800000,
        km: 2000,
        fuel: 'Petrol',
        transmission: 'Automatic',
        power: 1500,
        zeroToHundred: 2.4,
        topSpeed: 420,
        consumption: 22.0,
        label: 'C',
        body: 'Coupe',
        seats: 2,
        doors: 2,
        color: 'Blue',
        location: 'Madrid',
        condition: 'Used',
        warranty: '3 years',
        description: 'Ultimate hypercar with record-breaking performance.',
        baseColor: '#1e88e5'
    },
    {
        id: 46,
        brand: 'Ford',
        model: 'F-150',
        year: 2021,
        price: 35000,
        km: 25000,
        fuel: 'Petrol',
        transmission: 'Automatic',
        power: 400,
        zeroToHundred: 6.2,
        topSpeed: 180,
        consumption: 11.2,
        label: 'C',
        body: 'Pickup',
        seats: 5,
        doors: 4,
        color: 'Red',
        location: 'Valencia',
        condition: 'Used',
        warranty: '2 years',
        description: 'America’s best-selling pickup with impressive capability.',
        baseColor: '#c62828'
    },
    {
        id: 47,
        brand: 'Chevrolet',
        model: 'Silverado',
        year: 2022,
        price: 37000,
        km: 20000,
        fuel: 'Petrol',
        transmission: 'Automatic',
        power: 355,
        zeroToHundred: 7.0,
        topSpeed: 180,
        consumption: 10.5,
        label: 'C',
        body: 'Pickup',
        seats: 5,
        doors: 4,
        color: 'Black',
        location: 'Barcelona',
        condition: 'Used',
        warranty: '2 years',
        description: 'Rugged pickup with comfort and versatility.',
        baseColor: '#212121'
    },
    {
        id: 48,
        brand: 'GMC',
        model: 'Sierra',
        year: 2020,
        price: 36000,
        km: 30000,
        fuel: 'Petrol',
        transmission: 'Automatic',
        power: 420,
        zeroToHundred: 6.5,
        topSpeed: 179,
        consumption: 11.8,
        label: 'C',
        body: 'Pickup',
        seats: 5,
        doors: 4,
        color: 'Silver',
        location: 'Seville',
        condition: 'Used',
        warranty: '2 years',
        description: 'Premium pickup with impressive towing capacity.',
        baseColor: '#757575'
    },
    {
        id: 49,
        brand: 'Ram',
        model: '1500',
        year: 2021,
        price: 38000,
        km: 22000,
        fuel: 'Petrol',
        transmission: 'Automatic',
        power: 395,
        zeroToHundred: 6.4,
        topSpeed: 175,
        consumption: 11.0,
        label: 'C',
        body: 'Pickup',
        seats: 5,
        doors: 4,
        color: 'Blue',
        location: 'Madrid',
        condition: 'Used',
        warranty: '2 years',
        description: 'Comfortable pickup with smooth ride and tech features.',
        baseColor: '#1565c0'
    },
    {
        id: 50,
        brand: 'Toyota',
        model: 'Hilux',
        year: 2019,
        price: 29000,
        km: 40000,
        fuel: 'Diesel',
        transmission: 'Manual',
        power: 150,
        zeroToHundred: 12.8,
        topSpeed: 170,
        consumption: 7.8,
        label: 'C',
        body: 'Pickup',
        seats: 5,
        doors: 4,
        color: 'White',
        location: 'Granada',
        condition: 'Used',
        warranty: '1 year',
        description: 'Durable pickup trusted for work and adventure.',
        baseColor: '#b0a08c' // changed from #fafafa to improve contrast
    }
];

// Generate image arrays for each car
cars.forEach(car => {
    car.images = generatePlaceholderImages(car.brand, car.model, car.baseColor);
});

// Populate filter options based on dataset
function populateFilterOptions() {
    const fuelSet = new Set();
    const transmissionSet = new Set();
    const labelSet = new Set();
    const bodySet = new Set();
    cars.forEach(car => {
        fuelSet.add(car.fuel);
        transmissionSet.add(car.transmission);
        labelSet.add(car.label);
        bodySet.add(car.body);
    });
    createCheckboxGroup('fuel-options', Array.from(fuelSet));
    createCheckboxGroup('transmission-options', Array.from(transmissionSet));
    createCheckboxGroup('label-options', Array.from(labelSet));
    createCheckboxGroup('body-options', Array.from(bodySet));
}

function createCheckboxGroup(containerId, values) {
    const container = document.getElementById(containerId);
    values.forEach(value => {
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = value;
        checkbox.addEventListener('change', debounce(updateList, 300));
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(value));
        container.appendChild(label);
    });
}

// LocalStorage helpers
function getStoredArray(key) {
    return JSON.parse(localStorage.getItem(key) || '[]');
}

function setStoredArray(key, arr) {
    localStorage.setItem(key, JSON.stringify(arr));
}

// Favorites
function toggleFavorite(id) {
    let favs = getStoredArray('favorites');
    if (favs.includes(id)) {
        favs = favs.filter(i => i !== id);
    } else {
        favs.push(id);
    }
    setStoredArray('favorites', favs);
    updateBadgeCounts();
    updateList();
}

function isFavorite(id) {
    return getStoredArray('favorites').includes(id);
}

// Compare list
function toggleCompare(id) {
    let cmp = getStoredArray('compare');
    if (cmp.includes(id)) {
        cmp = cmp.filter(i => i !== id);
    } else if (cmp.length < 4) {
        cmp.push(id);
    } else {
        alert('You can only compare up to 4 cars.');
    }
    setStoredArray('compare', cmp);
    updateBadgeCounts();
    updateList();
}

function isInCompare(id) {
    return getStoredArray('compare').includes(id);
}

// Recently viewed
function addRecentlyViewed(id) {
    let rec = getStoredArray('recent');
    rec = rec.filter(i => i !== id);
    rec.unshift(id);
    rec = rec.slice(0, 6);
    setStoredArray('recent', rec);
}

// Badges
function updateBadgeCounts() {
    const favCount = getStoredArray('favorites').length;
    const cmpCount = getStoredArray('compare').length;
    document.getElementById('favorite-count').textContent = favCount;
    document.getElementById('compare-count').textContent = cmpCount;
}

// Debounce helper
function debounce(func, wait) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

// Filter and sort cars
function getFilteredCars() {
    const search = document.getElementById('search').value.toLowerCase();
    const priceMin = parseFloat(document.getElementById('price-min').value) || 0;
    const priceMax = parseFloat(document.getElementById('price-max').value) || Number.MAX_VALUE;
    const yearMin = parseInt(document.getElementById('year-min').value) || 0;
    const yearMax = parseInt(document.getElementById('year-max').value) || new Date().getFullYear();
    const kmMin = parseFloat(document.getElementById('km-min').value) || 0;
    const kmMax = parseFloat(document.getElementById('km-max').value) || Number.MAX_VALUE;
    const powerMin = parseFloat(document.getElementById('power-min').value) || 0;
    const powerMax = parseFloat(document.getElementById('power-max').value) || Number.MAX_VALUE;
    // gather selected checkboxes
    const selectedFuel = Array.from(document.querySelectorAll('#fuel-options input:checked')).map(c => c.value);
    const selectedTrans = Array.from(document.querySelectorAll('#transmission-options input:checked')).map(c => c.value);
    const selectedLabel = Array.from(document.querySelectorAll('#label-options input:checked')).map(c => c.value);
    const selectedBody = Array.from(document.querySelectorAll('#body-options input:checked')).map(c => c.value);
    let filtered = cars.filter(car => {
        const matchesSearch = `${car.brand} ${car.model}`.toLowerCase().includes(search);
        const matchesPrice = car.price >= priceMin && car.price <= priceMax;
        const matchesYear = car.year >= yearMin && car.year <= yearMax;
        const matchesKm = car.km >= kmMin && car.km <= kmMax;
        const matchesPower = car.power >= powerMin && car.power <= powerMax;
        const matchesFuel = selectedFuel.length === 0 || selectedFuel.includes(car.fuel);
        const matchesTrans = selectedTrans.length === 0 || selectedTrans.includes(car.transmission);
        const matchesLabel = selectedLabel.length === 0 || selectedLabel.includes(car.label);
        const matchesBody = selectedBody.length === 0 || selectedBody.includes(car.body);
        return matchesSearch && matchesPrice && matchesYear && matchesKm && matchesPower && matchesFuel && matchesTrans && matchesLabel && matchesBody;
    });
    // sort
    const sortVal = document.getElementById('sort-select').value;
    if (sortVal) {
        const [field, order] = sortVal.split('-');
        filtered.sort((a, b) => {
            let valA, valB;
            switch (field) {
                case 'price':
                    valA = a.price; valB = b.price; break;
                case 'year':
                    valA = a.year; valB = b.year; break;
                case 'km':
                    valA = a.km; valB = b.km; break;
                case 'power':
                    valA = a.power; valB = b.power; break;
                default:
                    valA = 0; valB = 0;
            }
            return order === 'asc' ? valA - valB : valB - valA;
        });
    }
    return filtered;
}

// Render car cards
function renderCars(list) {
    const container = document.getElementById('cars-container');
    container.innerHTML = '';
    list.forEach(car => {
        const card = document.createElement('div');
        card.className = 'car-card';
        // main image
        const img = document.createElement('img');
        img.src = car.images[0];
        img.alt = `${car.brand} ${car.model}`;
        card.appendChild(img);
        const body = document.createElement('div');
        body.className = 'card-body';
        const h3 = document.createElement('h3');
        h3.textContent = `${car.brand} ${car.model}`;
        body.appendChild(h3);
        const p1 = document.createElement('p');
        p1.textContent = `${car.year} · ${car.fuel} · ${car.km.toLocaleString()} km`;
        body.appendChild(p1);
        const p2 = document.createElement('p');
        p2.textContent = `€${car.price.toLocaleString()}`;
        body.appendChild(p2);
        // Footer actions
        const footer = document.createElement('div');
        footer.className = 'card-footer';
        const favBtn = document.createElement('button');
        favBtn.textContent = isFavorite(car.id) ? '❤️' : '🤍';
        favBtn.title = isFavorite(car.id) ? 'Remove from favorites' : 'Add to favorites';
        favBtn.addEventListener('click', e => {
            e.stopPropagation();
            toggleFavorite(car.id);
        });
        const compareBtn = document.createElement('button');
        compareBtn.textContent = isInCompare(car.id) ? '⚖️' : '➕';
        compareBtn.title = isInCompare(car.id) ? 'Remove from compare' : 'Add to compare';
        compareBtn.addEventListener('click', e => {
            e.stopPropagation();
            toggleCompare(car.id);
        });
        const detailsBtn = document.createElement('button');
        detailsBtn.textContent = 'View details';
        detailsBtn.addEventListener('click', () => openDetail(car.id));
        footer.appendChild(favBtn);
        footer.appendChild(compareBtn);
        footer.appendChild(detailsBtn);
        body.appendChild(footer);
        card.appendChild(body);
        container.appendChild(card);
    });
}

function updateList() {
    const list = getFilteredCars();
    renderCars(list);
}

// Open detail modal
function openDetail(carId) {
    const car = cars.find(c => c.id === carId);
    if (!car) return;
    // Save recently viewed
    addRecentlyViewed(car.id);
    updateBadgeCounts();
    // Fill gallery
    const gallery = document.getElementById('detail-gallery');
    gallery.innerHTML = '';
    car.images.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `${car.brand} ${car.model}`;
        gallery.appendChild(img);
    });
    // Title and description
    document.getElementById('detail-title').textContent = `${car.brand} ${car.model}`;
    document.getElementById('detail-description').textContent = car.description;
    // Specs table
    const specsTable = document.getElementById('detail-specs');
    specsTable.innerHTML = '';
    const specs = {
        'Year': car.year,
        'Price (€)': car.price.toLocaleString(),
        'Kilometres': car.km.toLocaleString(),
        'Fuel': car.fuel,
        'Transmission': car.transmission,
        'Power (CV)': car.power,
        '0-100 km/h (s)': car.zeroToHundred,
        'Top speed (km/h)': car.topSpeed,
        'Consumption (l/100km or kWh)': car.consumption,
        'Label': car.label,
        'Body': car.body,
        'Seats': car.seats,
        'Doors': car.doors,
        'Color': car.color,
        'Location': car.location,
        'Condition': car.condition,
        'Warranty': car.warranty
    };
    Object.entries(specs).forEach(([key, value]) => {
        const row = document.createElement('tr');
        const th = document.createElement('th');
        th.textContent = key;
        const td = document.createElement('td');
        td.textContent = value;
        row.appendChild(th);
        row.appendChild(td);
        specsTable.appendChild(row);
    });
    // Buttons actions
    const favBtn = document.getElementById('add-favorite');
    favBtn.textContent = isFavorite(car.id) ? 'Remove favorite ❤️' : 'Add to favorites ❤️';
    favBtn.onclick = () => {
        toggleFavorite(car.id);
        favBtn.textContent = isFavorite(car.id) ? 'Remove favorite ❤️' : 'Add to favorites ❤️';
    };
    const cmpBtn = document.getElementById('add-compare');
    cmpBtn.textContent = isInCompare(car.id) ? 'Remove compare ⚖️' : 'Add to compare ⚖️';
    cmpBtn.onclick = () => {
        toggleCompare(car.id);
        cmpBtn.textContent = isInCompare(car.id) ? 'Remove compare ⚖️' : 'Add to compare ⚖️';
    };
    document.getElementById('contact-seller').onclick = () => {
        alert('Contacting seller for ' + car.brand + ' ' + car.model + '.');
    };
    // Recently viewed list
    renderRecentlyViewed(car.id);
    // Show modal
    const modal = document.getElementById('detail-modal');
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
}

function renderRecentlyViewed(currentId) {
    const recentDiv = document.getElementById('recently-viewed');
    const recentIds = getStoredArray('recent');
    if (!recentIds.length) {
        recentDiv.innerHTML = '';
        return;
    }
    const heading = document.createElement('h3');
    heading.textContent = 'Recently viewed';
    const list = document.createElement('ul');
    recentIds.forEach(id => {
        const car = cars.find(c => c.id === id);
        if (car) {
            const li = document.createElement('li');
            li.textContent = `${car.brand} ${car.model}`;
            li.onclick = () => openDetail(car.id);
            list.appendChild(li);
        }
    });
    recentDiv.innerHTML = '';
    recentDiv.appendChild(heading);
    recentDiv.appendChild(list);
}

// Close modals
function closeModals() {
    document.getElementById('detail-modal').classList.add('hidden');
    document.getElementById('detail-modal').setAttribute('aria-hidden', 'true');
    document.getElementById('compare-modal').classList.add('hidden');
    document.getElementById('compare-modal').setAttribute('aria-hidden', 'true');
}

// Open compare modal
function openCompareModal() {
    renderCompareTable();
    const modal = document.getElementById('compare-modal');
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
}

// Render compare table
function renderCompareTable() {
    const compareIds = getStoredArray('compare');
    const carsToCompare = compareIds.map(id => cars.find(c => c.id === id)).filter(Boolean);
    const container = document.getElementById('compare-table-container');
    container.innerHTML = '';
    if (carsToCompare.length === 0) {
        container.textContent = 'No cars selected for comparison.';
        return;
    }
    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    headerRow.appendChild(document.createElement('th')); // empty corner
    carsToCompare.forEach(car => {
        const th = document.createElement('th');
        th.textContent = `${car.brand} ${car.model}`;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);
    // Define fields to compare
    const fields = {
        'Price (€)': car => car.price.toLocaleString(),
        'Year': car => car.year,
        'Kilometres': car => car.km.toLocaleString(),
        'Fuel': car => car.fuel,
        'Transmission': car => car.transmission,
        'Power (CV)': car => car.power,
        '0-100 km/h (s)': car => car.zeroToHundred,
        'Top speed (km/h)': car => car.topSpeed,
        'Consumption (l/100km or kWh)': car => car.consumption,
        'Label': car => car.label,
        'Body': car => car.body,
        'Seats': car => car.seats,
        'Doors': car => car.doors,
        'Color': car => car.color,
        'Location': car => car.location,
        'Condition': car => car.condition,
        'Warranty': car => car.warranty
    };
    Object.entries(fields).forEach(([name, fn]) => {
        const row = document.createElement('tr');
        const th = document.createElement('th');
        th.textContent = name;
        row.appendChild(th);
        carsToCompare.forEach(car => {
            const td = document.createElement('td');
            td.textContent = fn(car);
            row.appendChild(td);
        });
        table.appendChild(row);
    });
    container.appendChild(table);
}

// Theme toggle
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
    document.getElementById('theme-toggle').addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const newTheme = current === 'dark' ? '' : 'dark';
        if (newTheme) {
            document.documentElement.setAttribute('data-theme', newTheme);
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        localStorage.setItem('theme', newTheme);
    });
}

// Event listeners
function attachEvents() {
    document.getElementById('search').addEventListener('input', debounce(updateList, 300));
    ['price-min', 'price-max', 'year-min', 'year-max', 'km-min', 'km-max', 'power-min', 'power-max'].forEach(id => {
        document.getElementById(id).addEventListener('input', debounce(updateList, 300));
    });
    document.getElementById('sort-select').addEventListener('change', updateList);
    document.getElementById('detail-close').addEventListener('click', closeModals);
    document.getElementById('compare-close').addEventListener('click', closeModals);
    document.getElementById('compare-count').addEventListener('click', openCompareModal);
}

// Initialize app
function init() {
    populateFilterOptions();
    initTheme();
    attachEvents();
    updateBadgeCounts();
    updateList();
}

document.addEventListener('DOMContentLoaded', init);
