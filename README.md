# npc-data-manager-front
Npc Data Manager using AngularJS


# Docker image building

Build:
```
$ docker build -t npc-data-manager-front .
```

Run:

```
$ docker run -dp 9090:9090 npc-datamanager-front
```

Access at: ``http://localhost:9090``

Obs.: I didn't fix the image loading right now because it would need either to copy all images to
the repository (easy but ugly way) or to implement some image repository. Docker won't allow to copy
the files while building an image because they are located through symlink (which docker doesn't support
right now).
