function converter (type, unitA, unitB, value) {
  if (!(type in converter.conversions)) throw new Error('converteron: no such conversion type')
  if (value === undefined) throw new TypeError('converteron: cannot convert undefined')

  if (typeof value === 'string') value = parseFloat(value)
  if (unitA === unitB) return value

  var isTemperature = type === 'Temerature'
  var conversion = converter.conversions[type]

  var factorA = isTemperature ? conversion[unitA].factor : conversion[unitA]
  var factorB = isTemperature ? conversion[unitB].factor : conversion[unitB]

  if (isTemperature) value = value + conversion[unitA].increment

  value = (value * factorA) / factorB

  if (isTemperature) value = value - conversion[unitB].increment

  return value
}

converter.conversions = {
  'Acceleration': {
    'Meter/sq.sec (m/sec^2)': 1,
    'Foot/sq.sec (ft/sec^2)': 0.3048,
    'G (g)': 9.80665,
    'Galileo (gal)': 0.01,
    'Inch/sq.sec (in/sec^2)': 0.0254
  },
  'Area': {
    'Square meter (m^2)': 1,
    'Acre (acre)': 4046.856,
    'Are': 100,
    'Barn (barn)': 1e-28,
    'Hectare': 10000,
    'Rood': 1011.71413184285,
    'Square centimeter': 0.0001,
    'Square kilometer': 1000000,
    'Circular mil': 5.067075e-10,
    'Square foot (ft^2)': 0.09290304,
    'Square inch (in^2)': 0.00064516,
    'Square mile (mi^2)': 2589988,
    'Square yard (yd^2)': 0.8361274
  },
  'Torque': {
    'Newton-meter (N m)': 1,
    'Dyne-centimeter(dy cm)': 1e-7,
    'Kgrf-meter (kgf m)': 9.80665,
    'lbf-inch (lbf in)': 0.1129848,
    'lbf-foot (lbf ft)': 1.355818
  },
  'Electricity': {
    'Coulomb (Cb)': 1,
    'Abcoulomb': 10,
    'Ampere hour (A hr)': 3600,
    'Faraday (F)': 96521.8999999997,
    'Statcoulomb': 3.33564e-10,
    'Millifaraday (mF)': 96.5219,
    'Microfaraday (mu-F)': 0.0965219,
    'Picofaraday (pF)': 0.0000965219
  },
  'Energy': {
    'Joule (J)': 1,
    'BTU (mean)': 1055.87,
    'BTU (thermochemical)': 1054.35,
    'Calorie (SI) (cal)': 4.1868,
    'Calorie (mean)(cal)': 4.19002,
    'Calorie (thermo)': 4.184,
    'Electron volt (eV)': 1.6021e-19,
    'Erg (erg)': 1e-7,
    'Foot-pound force': 1.355818,
    'Foot-poundal': 0.04214011,
    'Horsepower-hour': 2684077.3,
    'Kilocalorie (SI)(kcal)': 4186.8,
    'Kilocalorie (mean)(kcal)': 4190.02,
    'Kilowatt-hour (kW hr)': 3600000,
    'Ton of TNT': 4200000000,
    'Volt-coulomb (V Cb)': 1,
    'Watt-hour (W hr)': 3600,
    'Watt-second (W sec)': 1
  },
  'Force': {
    'Newton (N)': 1,
    'Dyne (dy)': 0.00001,
    'Kilogram force (kgf)': 9.80665,
    'Kilopond force (kpf)': 9.80665,
    'Kip (k)': 4448.222,
    'Ounce force (ozf)': 0.2780139,
    'Pound force (lbf)': 0.4535924,
    'Poundal': 0.138255
  },
  'Force / Length': {
    'Newton/meter (N/m)': 1,
    'Pound force/inch (lbf/in)': 175.1268,
    'Pound force/foot (lbf/ft)': 14.5939
  },
  'Length': {
    'Meter (m)': 1,
    "Angstrom (A')": 1e-10,
    'Astronomical unit (AU)': 149598000000,
    'Caliber (cal)': 0.000254,
    'Centimeter (cm)': 0.01,
    'Kilometer (km)': 1000,
    'Ell': 1.143,
    'Em': 0.0042323,
    'Fathom': 1.8288,
    'Furlong': 201.168,
    'Fermi (fm)': 1e-15,
    'Foot (ft)': 0.3048,
    'Inch (in)': 0.0254,
    "League (int'l)": 5556,
    'League (UK)': 5556,
    'Light year (LY)': 9460550000000000,
    'Micrometer (mu-m)': 0.000001,
    'Mil': 0.0000254,
    'Millimeter (mm)': 0.001,
    'Nanometer (nm)': 1e-9,
    "Mile (int'l nautical)": 1852,
    'Mile (UK nautical)': 1853.184,
    'Mile (US nautical)': 1852,
    'Mile (US statute)': 1609.344,
    'Parsec': 30837400000000000,
    'Pica (printer)': 0.004217518,
    'Picometer (pm)': 1e-12,
    'Point (pt)': 0.0003514598,
    'Rod': 5.0292,
    'Yard (yd)': 0.9144
  },
  'Light': {
    'Lumen/sq.meter (Lu/m^2)': 1,
    'Lumen/sq.centimeter': 10000,
    'Lumen/sq.foot': 10.76391,
    'Foot-candle (ft-cdl)': 10.76391,
    'Foot-lambert': 10.76391,
    'Candela/sq.meter': 3.14159250538575,
    'Candela/sq.centimeter': 31415.9250538576,
    'Lux (lux)': 1,
    'Phot': 10000
  },
  'Mass': {
    'Kilogram (kgr)': 1,
    'Gram (gr)': 0.001,
    'Milligram (mgr)': 0.000001,
    'Microgram (mu-gr)': 1e-9,
    'Carat (metric)(ct)': 0.0002,
    'Hundredweight (long)': 50.80235,
    'Hundredweight (short)': 45.35924,
    'Pound mass (lbm)': 0.4535924,
    'Pound mass (troy)': 0.3732417,
    'Ounce mass (ozm)': 0.02834952,
    'Ounce mass (troy)': 0.03110348,
    'Slug': 14.5939,
    'Ton (assay)': 0.02916667,
    'Ton (long)': 1016.047,
    'Ton (short)': 907.1847,
    'Ton (metric)': 1000,
    'Tonne': 1000
  },
  'Mass Flow': {
    'Kilogram/second (kgr/sec)': 1,
    'Pound mass/sec (lbm/sec)': 0.4535924,
    'Pound mass/min (lbm/min)': 0.007559873
  },
  'Density & Mass capacity': {
    'Kilogram/cub.meter': 1,
    'Grain/galon': 0.01711806,
    'Grams/cm^3 (gr/cc)': 1000,
    'Pound mass/cubic foot': 16.01846,
    'Pound mass/cubic-inch': 27679.91,
    'Ounces/gallon (UK,liq)': 6.236027,
    'Ounces/gallon (US,liq)': 7.489152,
    'Ounces (mass)/inch': 1729.994,
    'Pound mass/gal (UK,liq)': 99.77644,
    'Pound mass/gal (US,liq)': 119.8264,
    'Slug/cubic foot': 515.379,
    'Tons (long,mass)/cub.yard': 1328.939
  },
  'Power': {
    'Watt (W)': 1,
    'Kilowatt (kW)': 1000,
    'Megawatt (MW)': 1000000,
    'Milliwatt (mW)': 0.001,
    'BTU (SI)/hour': 0.2930667,
    'BTU (thermo)/second': 1054.35,
    'BTU (thermo)/minute': 17.5725,
    'BTU (thermo)/hour': 0.2928751,
    'Calorie (thermo)/second': 4.184,
    'Calorie (thermo)/minute': 0.06973333,
    'Erg/second': 1e-7,
    'Foot-pound force/hour': 0.0003766161,
    'Foot-pound force/minute': 0.02259697,
    'Foot-pound force/second': 1.355818,
    'Horsepower(550 ft lbf/s)': 745.7,
    'Horsepower (electric)': 746,
    'Horsepower (boiler)': 9809.5,
    'Horsepower (metric)': 735.499,
    'Horsepower (UK)': 745.7,
    'Kilocalorie (thermo)/min': 69.7333,
    'Kilocalorie (thermo)/sec': 4184
  },
  'Pressure & Stress': {
    'Newton/sq.meter': 1,
    'Atmosphere (normal)': 101325,
    'Atmosphere (techinical)': 98066.5,
    'Bar': 100000,
    'Centimeter mercury(cmHg)': 1333.22,
    "Centimeter water (4'C)": 98.0638,
    'Decibar': 10000,
    'Kgr force/sq.centimeter': 98066.5,
    'Kgr force/sq.meter': 9.80665,
    'Kip/square inch': 6894757,
    'Millibar': 100,
    'Millimeter mercury(mmHg)': 133.3224,
    'Pascal (Pa)': 1,
    'Kilopascal (kPa)': 1000,
    'Megapascal (Mpa)': 1000000,
    'Poundal/sq.foot': 47.88026,
    'Pound-force/sq.foot': 47.88026,
    'Pound-force/sq.inch (psi)': 6894.757,
    "Torr (mmHg,0'C)": 133.322
  },
  'Temerature': {
    "Degrees Celsius ('C)": {
      'factor': 1,
      'increment': 0
    },
    "Degrees Fahrenheit ('F)": {
      'factor': 0.555555555555,
      'increment': -32
    },
    "Degrees Kelvin ('K)": {
      'factor': 1,
      'increment': -273.15
    },
    "Degrees Rankine ('R)": {
      'factor': 0.555555555555,
      'increment': -491.67
    }
  },
  'Time': {
    'Second (sec)': 1,
    'Day (mean solar)': 86400,
    'Day (sidereal)': 86164.09,
    'Hour (mean solar)': 3600,
    'Hour (sidereal)': 3590.17,
    'Minute (mean solar)': 60,
    'Minute (sidereal)': 60,
    'Month (mean calendar)': 2628000,
    'Second (sidereal)': 0.9972696,
    'Year (calendar)': 31536000,
    'Year (tropical)': 31556930,
    'Year (sidereal)': 31558150
  },
  'Velocity & Speed': {
    'Meter/second (m/sec)': 1,
    'Foot/minute (ft/min)': 0.00508,
    'Foot/second (ft/sec)': 0.3048,
    'Kilometer/hour (kph)': 0.2777778,
    "Knot (int'l)": 0.5144444,
    'Mile (US)/hour (mph)': 0.44707,
    'Mile (nautical)/hour': 0.514444,
    'Mile (US)/minute': 26.8224,
    'Mile (US)/second': 1609.344,
    'Speed of light (c)': 299792458,
    'Mach (STP)(a)': 340.006875
  },
  'Viscosity': {
    'Newton-second/meter': 1,
    'Centipoise': 0.001,
    'Centistoke': 0.000001,
    'Sq.foot/second': 0.09290304,
    'Poise': 0.1,
    'Poundal-second/sq.foot': 1.488164,
    'Pound mass/foot-second': 1.488164,
    'Pound force-second/sq.foot': 47.88026,
    'Rhe': 10,
    'Slug/foot-second': 47.88026,
    'Stoke': 0.0001
  },
  'Volume & Capacity': {
    'Cubic Meter (m^3)': 1,
    'Cubic centimeter': 0.000001,
    'Cubic millimeter': 1e-9,
    'Acre-foot': 1233.482,
    'Barrel (oil)': 0.1589873,
    'Board foot': 0.002359737,
    'Bushel (US)': 0.03523907,
    'Cup': 0.0002365882,
    'Fluid ounce (US)': 0.00002957353,
    'Cubic foot': 0.02831685,
    'Gallon (UK)': 0.004546087,
    'Gallon (US,dry)': 0.004404884,
    'Gallon (US,liq)': 0.003785412,
    'Gill (UK)': 0.0001420652,
    'Gill (US)': 0.0001182941,
    'Cubic inch (in^3)': 0.00001638706,
    'Liter (new)': 0.001,
    'Liter (old)': 0.001000028,
    'Ounce (UK,fluid)': 0.00002841305,
    'Ounce (US,fluid)': 0.00002957353,
    'Peck (US)': 0.008809768,
    'Pint (US,dry)': 0.0005506105,
    'Pint (US,liq)': 0.0004731765,
    'Quart (US,dry)': 0.001101221,
    'Quart (US,liq)': 0.000946353,
    'Stere': 1,
    'Tablespoon': 0.00001478676,
    'Teaspoon': 0.000004928922,
    'Ton (register)': 2.831685,
    'Cubic yard': 0.7645549
  },
  'Volume Flow': {
    'Cubic meter/second': 1,
    'Cubic foot/second': 0.02831685,
    'Cubic foot/minute': 0.0004719474,
    'Cubic inches/minute': 2.731177e-7,
    'Gallons (US,liq)/minute)': 0.0000630902
  }
}
