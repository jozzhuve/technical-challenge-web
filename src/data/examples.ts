export const endorsementExample = {
  policyNumber: '08200000049',
  idEnvio: 5984,
  frecuencia: 'Semestral',
  tipoEndoso: 'CambioFrecuencia',
  producto: 'Rumbo',
  plan: 'PlanRumbo',
  moneda: 'Nuevo Sol',
  usuario: 'interface.servicios',
  fechaSolicitud: '2025-08-27',
  fechaCliente: '2025-08-27',
  fechaEfectiva: '2025-09-01',
};

export const routingExample = {
  accidentLocation: 'San Isidro',
  depots: ['Miraflores', 'Ate'],
  graph: {
    Miraflores: { 'San Isidro': 7, Barranco: 3 },
    'San Isidro': { Miraflores: 7, Lince: 4 },
    Barranco: { Miraflores: 3, Surco: 5 },
    Lince: { 'San Isidro': 4, Surco: 6 },
    Surco: { Barranco: 5, Lince: 6, Ate: 10 },
    Ate: { Surco: 10 },
  },
};
