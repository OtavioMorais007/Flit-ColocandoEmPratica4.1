interface Car {
  brand: string;
  model: string;
  value: number;
  color: string;
  automatic: boolean;
}

const saveCar = (): void => {
  const brand = (document.getElementById("brand") as HTMLInputElement).value;
  const model = (document.getElementById("model") as HTMLInputElement).value;
  const value = parseFloat((document.getElementById("value") as HTMLInputElement).value);
  const color = (document.getElementById("color") as HTMLInputElement).value;
  const automatic = (document.getElementById("automatic") as HTMLInputElement).value === "true";

  const newCar: Car = {
    brand,
    model,
    value,
    color,
    automatic,
  };

  const cars: Car[] = JSON.parse(localStorage.getItem("cars")) || [];
  cars.push(newCar);
  localStorage.setItem("cars", JSON.stringify(cars));
};

window.onload = () => {
  const cars: Car[] = JSON.parse(localStorage.getItem("cars")) || [];
  console.log(cars);
};

const searchCarsByBrand = (cars: Car[], brand: string): Car[] => {
  const filteredCars = cars.filter((car) => {
    return car.brand === brand;
  });
  return filteredCars;
};

const searchBrandsAvailables = (cars: Car[]): string[] => {
  const brands: { [key: string]: boolean } = {};

  cars.forEach((car) => {
    brands[car.brand] = true;
  });

  return Object.keys(brands);
};

const showProperties = (cars: Car[], properties: string[]): Partial<Car>[] => {
  const carsWithSelectedProperties: Partial<Car>[] = [];

  cars.forEach((car) => {
    const carWithProperties: Partial<Car> = {};

    properties.forEach((property) => {
      if (car.hasOwnProperty(property)) {
        carWithProperties[property] = car[property];
      }
    });

    carsWithSelectedProperties.push(carWithProperties);
  });

  return carsWithSelectedProperties;
};
