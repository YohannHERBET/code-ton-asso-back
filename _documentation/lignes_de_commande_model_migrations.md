# Les lignes de commandes utilisées pour créer les migrations
  

```bash
npx sequelize model:generate --name Developer --attributes type:enum:'{Frontend,Backend,Fullstack}',work_preferences:enum:'{Solo,Group,Both}',level:enum:'{Junior,Intermediate,Senior}',slug:string
```

```bash
npx sequelize model:generate --name Association --attributes rna:string,association_name:string,slug:string
```

```bash
npx sequelize model:generate --name User --attributes firstname:string,lastname:string,email:string,description:string,developer_id:integer,association_id:integer
```

```bash
npx sequelize model:generate --name Skill --attributes label:string,value:string
```

```bash
npx sequelize model:generate --name Category --attributes label:string,value:string
```

```bash
npx sequelize model:generate --name Type --attributes title:string,value:string
```

```bash
npx sequelize model:generate --name Feature --attributes label:string,value:string
```

```bash
npx sequelize model:generate --name Project --attributes title:string,description:text,other_features:string,release_date:DATE,slug:string,visible:boolean,status:enum:'{NotStarted,InProgress,Finished}',type_id:integer,association_id:integer
```