def save_file(data, filename, is_raw, storage):
    BUFFER_SIZE = 5 * 1024 * 1024  # 5mb
    saved_filename = storage.get_available_name(filename)
    with storage.open(saved_filename, "wb") as dest:
        if is_raw:
            chunk = data.read(BUFFER_SIZE)
            while chunk:
                dest.write(chunk)
                chunk = data.read(BUFFER_SIZE)
        else:
            for c in data.chunks():
                dest.write(c)
    return storage.url(saved_filename)
