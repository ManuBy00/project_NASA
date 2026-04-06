# 🌌 NASA APOD Explorer

Una aplicación web moderna y reactiva desarrollada con **Angular** que consume la API oficial de la NASA (*Astronomy Picture of the Day*) para acercar las maravillas del cosmos a los usuarios.

---

## 🚀 Características Principales

* **Exploración Diaria:** Consulta la imagen o vídeo astronómico del día con datos en tiempo real.
* **Gestión de Favoritos:** Guarda tus descubrimientos favoritos. Los datos se mantienen incluso después de cerrar el navegador gracias a la persistencia en **LocalStorage**.
* **Multi-idioma (i18n):** Interfaz disponible en varios idiomas gestionada con `ngx-translate`.
* **Arquitectura Robusta:** Uso de componentes standalone y Signals para un rendimiento óptimo.
* **Gestión de Estado (Redux):** Implementación del patrón **Redux mediante NgRx** para un flujo de datos optimizado.

---

## 🛠️ Stack Tecnológico

* **Core:** [Angular](https://angular.dev/) 
* **Estado Global:** [NgRx](https://ngrx.io/) (Store, Actions, Reducers).
* **Testing:** [Vitest](https://vitest.dev/) (Suite de tests unitarios de alta velocidad).
* **Internacionalización:** `ngx-translate`.
* **Estilos:** CSS3 nativo 
* **API:** [NASA Open APIs](https://api.nasa.gov/).



---

## 🧪 Testing

* **Unit Tests del Store:** Verificación de cambios de estado ante acciones de éxito y error.
* **Service Testing:** Pruebas de integración con LocalStorage para la lógica de favoritos.

Para ejecutar los tests:
```bash
npm test