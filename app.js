// EventBus.js - El EventBus global
const EventBus = {
    events: {},
    subscribe: function (eventName, callback) {
      if (!this.events[eventName]) {
        this.events[eventName] = [];
      }
      this.events[eventName].push(callback);
    },
    publish: function (eventName, data) {
      if (!this.events[eventName]) return;
      this.events[eventName].forEach(function (callback) {
        callback(data);
      });
    },
  };
  
  // ModuloA.js
  const ModuloA = {
    iniciar: function () {
      EventBus.subscribe("eventoDesdeModuloB", this.manejarEvento);
    },
    manejarEvento: function (data) {
      console.log("ModuloA ha recibido un evento desde ModuloB:", data);
    },
  };
  
  // ModuloB.js
  const ModuloB = {
    iniciar: function () {
      EventBus.subscribe("eventoDesdeModuloA", this.manejarEvento);
    },
    manejarEvento: function (data) {
      console.log("ModuloB ha recibido un evento desde ModuloA:", data);
    },
    enviarEvento: function () {
      const data = { mensaje: "Hola desde ModuloB" };
      EventBus.publish("eventoDesdeModuloB", data);
    },
  };
  
  // Uso de los módulos
  ModuloA.iniciar();
  ModuloB.iniciar();
  
  // ModuloB envía un evento a ModuloA
  ModuloB.enviarEvento();
  