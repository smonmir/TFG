export class Estado {
    id: number;
    nombre: string;
    descripcion: string;
  
    constructor(
      id: number,
      nombre: string,
      descripcion: string
    ) {
      this.id = id;
      this.nombre = nombre;
      this.descripcion = descripcion;
    }
  
    //Getters
    getId(): number {
      return this.id;
    }
  
    getNombre(): string {
      return this.nombre;
    }
  
    getDescripcion(): string {
      return this.descripcion;
    }
  
    //Setters
    setId(id: number): void {
      this.id = id;
    }
  
    setNombre(nombre: string): void {
      this.nombre = nombre;
    }
  
    setDescripcion(descripcion: string): void {
      this.descripcion = descripcion;
    }
  }
  