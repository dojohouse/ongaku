# Spotify API Notes

## Notes: Spotify.getDevices() Device ID

### Use Case 1: Plays a device with `is_active: true`

```
[
  {
    id: '32173e1237890fb338905faf08a9fafd',
    is_active: false,
    is_private_session: false,
    is_restricted: false,
    name: 'Kitchen Display',
    type: 'CastVideo',
    volume_percent: 0
  },
  {
    id: '5010e5835e5b937d6673767c688a037601cc602d',
    is_active: true,
    is_private_session: false,
    is_restricted: false,
    name: 'CHRIS-PC',
    type: 'Computer',
    volume_percent: 100
  }
]
```

- It will play on device id `5010e5835e5b937d6673767c688a037601cc602d`

### Use Case 2: All devices are `is_active: false`

```
[
  {
    id: 'e9edb7b100c1d138414eb56ede4fef44dd6c9371',
    is_active: false,
    is_private_session: false,
    is_restricted: false,
    name: 'iPhone',
    type: 'Smartphone',
    volume_percent: 100
  }
  {
    id: '5010e5835e5b937d6673767c688a037601cc602d',
    is_active: false,
    is_private_session: false,
    is_restricted: false,
    name: 'CHRIS-PC',
    type: 'Computer',
    volume_percent: 100
  }
]
```

- It will check if `spotify_default_device_id` is set in `.env` or first item in list
- **Note**: Seems like there some API restriction for certain device type like iOS
  - https://developer.spotify.com/documentation/web-playback-sdk/#supported-browsers

### Use Case 3: No devices

```
[]
```

- TODO: a way to trigger play on a device.